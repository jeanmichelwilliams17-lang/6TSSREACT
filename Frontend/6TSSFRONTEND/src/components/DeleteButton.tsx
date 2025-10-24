import type { Scoutmanagementscout } from "@/Types/DB_types";
import { Button } from "./ui/button";
import { useState } from "react";

const backendApi = import.meta.env.VITE_BACKEND_API;
interface DeleteButtonProps{
  data: Scoutmanagementscout
  setData: React.Dispatch<React.SetStateAction<Scoutmanagementscout[]>>
}

export default function DeleteButton({data, setData}: DeleteButtonProps){

  const [loading, setLoading] = useState(false)

  async function deleteScout(){
    setLoading(true)
    try{
      const response = await fetch(`${backendApi}/deleteScout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data.id),
          }
          
        );
      if (!response.ok) {
        throw new Error("failed to send scout to be deleted");
      }
      
      setData(prev => prev.filter(scout => scout.id !== data.id));
      const Scouts = await fetch(`${backendApi}/scoutsmanagement`);
      if (!Scouts.ok) {
        throw new Error("Failed to fetch scouts");
      } else {
        const data = await Scouts.json();
        setData(data);
      }
    }catch(err) {
      console.error("Error deleting scout:", err);
      alert("Something went wrong while deleting this scout.");
    }finally{
      setLoading(false)
    }
      
  }

  return(
    <Button onClick={deleteScout} variant={"destructive"} disabled={loading}>
    Delete
    </Button>
  )
}