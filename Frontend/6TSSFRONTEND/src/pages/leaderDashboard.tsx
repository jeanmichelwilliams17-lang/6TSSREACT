import LeaderHeader from "@/components/LeaderHeader";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

/*interface LeaderDashboardProps{
token: object

}
*/

export default function LeaderDashboard(){
   const navigate = useNavigate();

  async function  handleLogout(){
    const { error } = await supabase.auth.signOut()
    console.log(error);
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