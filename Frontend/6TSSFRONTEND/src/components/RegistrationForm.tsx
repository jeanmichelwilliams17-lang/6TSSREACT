import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "./ui/card"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const backendApi = import.meta.env.VITE_BACKEND_API;





const RegistrationFormSchema = z.object({

  password: z
  .string()
  .min(8).regex(/[A-Z]/, "Must contain at least one uppercase letter"),
  confirmPassword: z
  .string()
  .min(8).regex(/[A-Z]/, "Must contain at least one uppercase letter"),  
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This sets the error on the confirmPassword field
  });
type RegistrationFormValues = z.infer<typeof RegistrationFormSchema>



export default function RegistrationForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
   

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  
  async function onSubmit(formData: RegistrationFormValues) {
    setLoading(true);
      
    try{
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password
      });
      if (error) throw error;
      if (!data.user?.id) throw new Error("No user ID found");
      alert("Password updated successfully!");

      const userId = data.user.id

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

    } 
    catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
    finally{
      setLoading(false)
    }
  }

  


  return (
    <div className="flex items-center justify-center h-screen" >
      
    <Card className="w-full max-w-[90%] self-center">
      <header className="p-4 text-center font-bold text-2xl">Add Leader</header>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-6 self-center">
        
      <FormField
      control={form.control}
        name ="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input 
              type="password"
              className="flex w-full mx-auto
              self-center"
              autoComplete="new-password"
              placeholder="Please Enter Password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name ="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input 
            autoComplete="new-password"
            type="password" 
            placeholder="Please enter the same Password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />

      <Button 
      className="bg-blue-600" 
      type="submit"
      disabled={loading}
      >Register Password</Button>
      </form>
    </Form>
    </Card>
    </div>
  )
}