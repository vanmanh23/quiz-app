import { useForm, SubmitHandler } from "react-hook-form";
import { createtest, createtestpicture, findtest } from "@/api/categories";
import { useContext } from "react";
import { TestsContext } from "../../../../utils/testContext";
import { useToast } from "@/components/ui/use-toast";
import { numberOfQuestionContextShape } from "../../../../utils/durationContext";

interface IFormInput {
  testName: string;
  numOfQuestions: number;
  duration: number;
  title: string;
  uri: FileList;
  alt: string;
}

export default function TestForm() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { test, handleTestChange } = useContext(TestsContext);
  const { numberOfQuestion, handlenumberChange } = useContext(numberOfQuestionContextShape);
  const { toast } = useToast();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    handleTestChange(data.testName);
    handlenumberChange(data.numOfQuestions);
    console.log("numberofquestion: ", numberOfQuestion);
    console.log("test in file testForm: ", test);
    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    const formData = {
      testName: data.testName,
      title: data.title,
      numOfQuestions: parseInt(data.numOfQuestions as unknown as string, 10),
      // numOfQuestions: data.numOfQuestions,
      duration: parseInt(data.duration as unknown as string, 10),
    };
    try {
      await createtest(formData);
      const findtestid = await findtest(data.testName);
      const base64Uri = await fileToBase64(data.uri[0]);
      const formpicture = {
        uri: base64Uri,
        alt: data.alt,
        testnameId: findtestid.testName.id,
      };
      console.log("findtestid: ", findtestid.testName.id);
      console.log("formpicture: ", formpicture);
      await createtestpicture(formpicture);
      toast({
        title: "Create test successfully",
        style: {
          color: "#27ae60", // Set your desired text color
        },
      })
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full md:w-2/4 flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label className="">Name of test</label>
        <input
          type="text"
          {...register("testName")}
          className="focus:no-underline rounded-lg"
        />
        <label className="">Title</label>
        <input
          type="text"
          {...register("title")}
          className="focus:no-underline rounded-lg"
        />
        <label className="">Number of questions</label>
        <input
          type="number"
          {...register("numOfQuestions", { min: 4, max: 20 })}
          className="focus:no-underline rounded-lg"
        />
        <label className="">Duration</label>
        <input
          type="number"
          {...register("duration")}
          className="focus:no-underline rounded-lg"
        />
        <label className="">url</label>
        <input
          type="file"
          {...register("uri")}
          className="focus:no-underline rounded-lg"
        />
        <label className="">name image</label>
        <input
          type="string"
          {...register("alt")}
          className="focus:no-underline rounded-lg"
        />
        {/* <input type="submit" /> */}
        <button
          type="submit"
          className="bg-third mt-4 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
