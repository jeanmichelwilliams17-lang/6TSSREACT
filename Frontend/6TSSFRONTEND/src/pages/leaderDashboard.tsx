import LeaderHeader from "@/components/LeaderHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/*interface LeaderDashboardProps{
token: object

}
*/

export default function LeaderDashboard(){
   const navigate = useNavigate();

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
    <LeaderHeader></LeaderHeader>

    <div>
      <h3>Welcome back</h3>
      <Button onClick={handleLogout}>Logout</Button>

    </div>
    </>
  )
}