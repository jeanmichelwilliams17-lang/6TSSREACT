import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

const backendApi = import.meta.env.VITE_BACKEND_API; 

interface AuthHelperProps{
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setUserRole: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  userRole: string
}

export default function AuthHelper({setUser, setUserRole, userRole, setLoading}: AuthHelperProps){
  const navigate = useNavigate();

  useEffect( ()=> {
    async function getUser(){
      const { data: { user } } = await supabase.auth.getUser();
      if(user){
      setUser(user);
      }else{
        console.log("No user Found");
        navigate("/Login");
      }

      if (!user?.id) return;
      const userId = user.id;

      try {
        const response = await fetch(`${backendApi}/getRole/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Role");
        }
        const data = await response.json();
        setUserRole(data.role || '');
      } 
      catch (err) {
        console.error("Failed to fetch role", err);
        setUserRole('');
      } 
      finally {
        setLoading(false);
      }
    }
    getUser();
  }, [navigate, setUser, setUserRole, setLoading] 
)
  console.log(userRole);


  
  return null;

}