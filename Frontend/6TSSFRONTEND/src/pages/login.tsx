import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"

const backendApi = import.meta.env.VITE_BACKEND_API; 

export default function LoginPage() {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
        email:'',password:''
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.id]:event.target.value
      }

    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    try{
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })
    if (error) throw error;
    if (!data.user?.id) throw new Error("No user ID found");
    const userId = data.user.id;

    const response = await fetch(`${backendApi}/getRole/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Role");
    }
    const userRoleObj = await response.json();
    const userRole = userRoleObj.role;
    if (userRole === "scout"){
      navigate("/scoutDashboard")
    }else if (userRole === "leader"){
      navigate("/leaderDashboard")
    }else{
      navigate("/login")
    }
      
    }catch (err) {
      console.error(err);
      alert(err);
    } 
  }


  return (
    <>

    <Header></Header>

    <div className="flex items-center justify-center h-screen">

      <Card className="w-full max-w-sm self-center">

        <CardHeader>
          <CardTitle>Tobattendance</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>

            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                id="password" 
                type="password" 
                required 
                onChange={handleChange} />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2">
            Login
          </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          
        </CardFooter>
        
      </Card>
    </div>
    </>
  )
}
