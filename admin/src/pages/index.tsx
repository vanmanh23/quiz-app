import { deleteTest, getAllTest } from "@/api/categories";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Component() {
  const [data, setData] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    const fetchData = async() => {     
      try {
        const allTest = await getAllTest();
        setData(allTest);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])
  const handelRemove = async(id: string) => {
    await deleteTest(id);
    toast({
      title: "Remove test successfully",
      style: {
        color: "red", // Set your desired text color
      },
    })
  }
  return (
    <div>
       <Table>
      <TableCaption>all tests</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Test Name</TableHead>
          <TableHead>Numbers of question</TableHead>
          <TableHead>Duration time</TableHead>
          <TableHead className="items-end">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.testName}</TableCell>
            <TableCell>{item.numOfQuestions}</TableCell>
            <TableCell>{item.duration}</TableCell>
            <TableCell className="items-end"><Trash2 className="cursor-pointer text-red-600" onClick={() => handelRemove(item.id)}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
