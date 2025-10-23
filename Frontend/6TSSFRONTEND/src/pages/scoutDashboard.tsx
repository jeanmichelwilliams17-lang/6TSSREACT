import ScoutHeader from "@/components/ScoutHeader";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

/*interface LeaderDashboardProps{
token: object

}
*/

export default function ScoutDashboard(){
   const navigate = useNavigate();

  async function handleLogout(){
    const { error } = await supabase.auth.signOut()
        console.log(error);
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