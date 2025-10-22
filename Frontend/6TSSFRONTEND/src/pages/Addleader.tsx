import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LeaderHeader from "@/components/LeaderHeader";
import type { Leader } from "@/Types/DB_types";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import AddLeaderForm from "@/components/AddLeaderForm";



export default function Addleaders(){
  const backendApi = import.meta.env.VITE_BACKEND_API; 
  const [data, setData] =useState<Leader[]>([])

  useEffect(
    () => {
      async function getLeaders() {
        const response = await fetch(`${backendApi}/loadleaders`);
        if (!response.ok) {
          throw new Error("Failed to fetch leaders");
        } else {
          const data = await response.json();
          setData(data);
        }
      }
      getLeaders();
    },
    [backendApi]
  )



  return(
    <>
    <LeaderHeader></LeaderHeader>

    <AddLeaderForm setData={setData}></AddLeaderForm>

    <Card className=" mb-10 mx-3">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Section</TableHead>
          <TableHead className="text-center">Rank</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow key={data.leader_id}>
            <TableCell className="font-medium">{data.first_name}</TableCell>
            <TableCell>{data.last_name}</TableCell>
            <TableCell>{data.section}</TableCell>
            <TableCell className="text-center">{data.rank}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </Card>
    </>
  )

}