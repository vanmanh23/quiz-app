import { useForm, SubmitHandler } from "react-hook-form"
import { createtest } from "@/api/categories"

interface IFormInput {
    testName: string
    numOfQuestions: number
    duration: number
    title: string
  }
  

export default function TestForm() {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
      try{
        createtest(data)
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className="w-full md:w-2/4 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label className="">Name of test</label>
        <input type="text" {...register("testName")} className="focus:no-underline rounded-lg"/>
        <label className="">Title</label>
        <input type="text" {...register("title")} className="focus:no-underline rounded-lg"/>
        <label className="">Number of questions</label>
        <input type="text" {...register("numOfQuestions", {min: 10, max: 20})} className="focus:no-underline rounded-lg"/>
        <label className="">Duration</label>
        <input type="text" {...register("duration")} className="focus:no-underline rounded-lg"/>
      {/* <input type="submit" /> */}
      <button type="submit" className="bg-third mt-4 text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
    </div>
  )
}
