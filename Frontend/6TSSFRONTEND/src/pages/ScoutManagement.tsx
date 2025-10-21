import LeaderHeader from "@/components/LeaderHeader";

export default function ScoutManagement(){
  const backendApi = import.meta.env.VITE_BACKEND_API; 

async function getScouts() {
  const response = await fetch(`${backendApi}/scoutmanagement`);
  if (!response.ok) throw new Error("Failed to fetch scouts");

  const data = await response.json();
  return data;
}

getScouts().then(data => console.log(data));

  return(
    <>
    <LeaderHeader></LeaderHeader>
    <div>hi</div>
    </>
  )

}