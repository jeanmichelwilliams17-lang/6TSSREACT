import ScoutHeader from "@/components/ScoutHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/*interface LeaderDashboardProps{
token: object

}
*/

export default function ScoutDashboard(){
   const navigate = useNavigate();

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
    <ScoutHeader></ScoutHeader>

    <div>
      <h3>Welcome back</h3>
      <Button onClick={handleLogout}>Logout</Button>

    </div>
    </>
  )
}