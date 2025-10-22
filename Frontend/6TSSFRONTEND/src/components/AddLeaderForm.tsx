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
import type { Leader } from "@/Types/DB_types"

interface AddLeaderFormProps{
  setData: React.Dispatch<React.SetStateAction<Leader[]>>
}

const backendApi = import.meta.env.VITE_BACKEND_API;

const profileFormSchema = z.object({

  first_name: z
  .string()
  .min(2, {
      message: "firstname must be at least 2 characters.",
    })
    .max(30, {
      message: "lastname must not be longer than 30 characters.",
    }),

    last_name: z
  .string()
  .min(2, {
      message: "firstname must be at least 2 characters.",
    })
    .max(30, {
      message: "lastname must not be longer than 30 characters.",
    }),

    section: z
    .string()
    .min(2, {
      message: "firstname must be at least 2 characters.",
    }),

    rank: z
    .string()
    .min(2, {
      message: "firstname must be at least 2 characters.",
    }),

  email: z
    .string()
    .nonempty({message: "Select an email to use for login"}),
})
type ProfileFormValues = z.infer<typeof profileFormSchema>



export default function AddLeaderForm({setData}: AddLeaderFormProps) {
   

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      section: "",
      rank: "",
      email: "",
    },
    mode: "onChange",
  })

  
  function onSubmit(data: ProfileFormValues) {
      

      async function createLeader(){
      const response = await fetch(`${backendApi}/createLeader`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
        );
       if (!response.ok) {
          throw new Error("failed to send scout");
        }
        const newLeader = await response.json()
        const {email, ...leaderForTable} = newLeader;
        console.log(email);
        setData((prev) => [...prev, leaderForTable]);

        async function getScouts() {
        const response = await fetch(`${backendApi}/loadleaders`);
        if (!response.ok) {
          throw new Error("Failed to fetch scouts");
        } else {
          const data = await response.json();
          setData(data);
        }
      }
      getScouts();
        }
        
        createLeader();
      }

  


  return (
    <div className="flex items-center justify-center h-screen" >
      
    <Card className="w-full max-w-[90%] self-center">
      <header className="p-4 text-center font-bold text-2xl">Add Leader</header>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-6 self-center">
        
      <FormField
      control={form.control}
        name ="first_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input 
              className="flex w-full mx-auto
              self-center"               placeholder="Please enter First Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name ="last_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Please enter Last Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="your.email@example.com"
              type="email"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />


      <FormField
      control={form.control}
      name ="section"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Section</FormLabel>
          <FormControl>
            <Input placeholder="Please enter leaders Section" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
      />


      <FormField
      control={form.control}
      name ="rank"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rank</FormLabel>
          <FormControl>
            <Input placeholder="Please enter leaders rank" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
      />

      <Button className="bg-blue-600" type="submit">Add Leader</Button>
      </form>
    </Form>
    </Card>
    </div>
  )
}