import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LeaderHeader from "@/components/LeaderHeader";
import type { Scoutmanagementscout } from "@/Types/DB_types";
import { useEffect, useState } from "react";
import AddScoutForm from "@/components/AddScoutForm";
import { Card } from "@/components/ui/card";
import RowForTable from "@/components/TableRow";



export default function ScoutManagement(){
  const backendApi = import.meta.env.VITE_BACKEND_API; 
  const [data, setData] =useState<Scoutmanagementscout[]>([])

  useEffect(
    () => {
      async function getScouts() {
        const response = await fetch(`${backendApi}/scoutsmanagement`);
        if (!response.ok) {
          throw new Error("Failed to fetch scouts");
        } else {
          const data = await response.json();
          setData(data);
        }
      }
      getScouts();
    },
    [backendApi]
  )



  return(
    <>
    <LeaderHeader></LeaderHeader>

    <AddScoutForm setData={setData}></AddScoutForm>

    <Card className=" mb-10 mx-3">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Crew</TableHead>
          <TableHead className="text-center">Rank</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <RowForTable data={data} setData={setData}></RowForTable>
        ))}
      </TableBody>
      
    </Table>
    </Card>
    </>
  )

}