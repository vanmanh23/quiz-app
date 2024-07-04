import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAchievements, getAllUsers, RemoveAchievement, RemoveUser } from "@/api/users";
import { Trash2 } from "lucide-react";

export default function Component() {
  const [data, setData] = useState([]);
  const [dataAchievements, setDataAchievements] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allusers = await getAllUsers();
        const addAchievements = await getAchievements();
        setData(allusers);
        setDataAchievements(addAchievements);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handRemoveAchie = async (id: string) => {
    await RemoveAchievement(id);
  };
  const handRemoveUser = async (id: string) => {
    await RemoveUser(id);
  };

  return (
    <div>
      <h2 className="text-2xl uppercase font-bold">all users</h2>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT</TableHead>
            <TableHead className="w-[100px]">User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="items-end">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{item.userName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="items-end">
                <Trash2 className="cursor-pointer text-red-600" onClick={() => handRemoveUser(item.id)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr />
      {/*  */}
      <div className="mt-10">
        <h2 className="text-2xl uppercase font-bold">all achievements</h2>
        <hr />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">STT</TableHead>
              <TableHead className="w-[100px]">User Name</TableHead>
              <TableHead className="w-[100px]">Email</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead className="w-[100px]">Scores</TableHead>
              <TableHead>correctAnswers</TableHead>
              <TableHead>time Taken</TableHead>
              <TableHead>Day</TableHead>
              <TableHead className="items-end">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataAchievements.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.user.userName}
                </TableCell>
                <TableCell>{item.user.email}</TableCell>
                <TableCell>{item.testName.testName}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.correctAnswers}</TableCell>
                <TableCell>{item.timeTaken}</TableCell>
                <TableCell>{item.day}</TableCell>
                <TableCell className="items-end">
                  <Trash2 className="cursor-pointer text-red-600" onClick={() => handRemoveAchie(item.id)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
