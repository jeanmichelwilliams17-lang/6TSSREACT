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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Scoutmanagementscout } from "@/Types/DB_types";

interface AddScoutFormProps{
  setData: React.Dispatch<React.SetStateAction<Scoutmanagementscout[]>>
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

    crew: z
    .enum(["Falcons", "Kingfishers", "Dophins", "Orcas", "Barracudas", "Swifts", "Marlins", "Terns", "Seals", "Junior Executive", "Senior Executive", "crewless", "Alpha", "Beta", "Charlie", "Delta"
    ]),

    rank: z
    .enum(["Scout", "Waister", "Assistant Crew Leader", "Crew Leader", "Junior Executive", "Senior Executive", "Venture Scout"]),

  email: z
    .string()
    .nonempty({message: "Select an email to use for login"}),
})
type ProfileFormValues = z.infer<typeof profileFormSchema>



export default function AddScoutForm({setData}: AddScoutFormProps) {
   

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      crew: "crewless",
      rank: "Waister",
      email: "",
    },
    mode: "onChange",
  })

  
  function onSubmit(data: ProfileFormValues) {
      

      async function createScout(){
      const response = await fetch(`${backendApi}/createScout`,
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
        const newScout = await response.json()
        const {email, ...scoutForTable} = newScout;
        console.log(email);
        setData((prev) => [...prev, scoutForTable]);

        async function getScouts() {
        const response = await fetch(`${backendApi}/scoutsmanagement`);
        if (!response.ok) {
          throw new Error("Failed to fetch scouts");
        } else {
          const data = await response.json();
          setData(data);
        }
      }
      getScouts();
        }
        
        createScout();
      }

  


  return (
    <div className="flex items-center justify-center h-screen" >
      
    <Card className="w-full max-w-[90%] self-center">
      <header className="p-4 text-center font-bold text-2xl">Add Scout</header>
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
      name="crew"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Crew</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[90%] mx-auto">
                <SelectValue placeholder="Select Crew" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Falcons">Falcons</SelectItem>
              <SelectItem value="Kingfishers">Kingfishers</SelectItem>
              <SelectItem value="Dophins">Dolphins</SelectItem>
              <SelectItem value="Orcas">Orcas</SelectItem>
              <SelectItem value="Barracudas">Barracudas</SelectItem>
              <SelectItem value="Swifts">Swifts</SelectItem>
              <SelectItem value="Marlins">Marlins</SelectItem>
              <SelectItem value="Terns">Terns</SelectItem>
              <SelectItem value="Seals">Seals</SelectItem>
              <SelectItem value="Junior Executive">Junior Executive</SelectItem>
              <SelectItem value="Senior Executive">Senior Executive</SelectItem>
              <SelectItem value="crewless">Crewless</SelectItem>
              <SelectItem value="Alpha">Alpha</SelectItem>
              <SelectItem value="Beta">Beta</SelectItem>
              <SelectItem value="Charlie">Charlie</SelectItem>
              <SelectItem value="Delta">Delta</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
      />


      <FormField
      control={form.control}
      name="rank"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rank</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[90%] mx-auto">
                <SelectValue placeholder="Select Rank" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Scout">Scout</SelectItem>
              <SelectItem value="Waister">Waister</SelectItem>
              <SelectItem value="Assistant Crew Leader">Assistant Crew Leader</SelectItem>
              <SelectItem value="Crew Leader">Crew Leader</SelectItem>
              <SelectItem value="Junior Executive">Junior Executive</SelectItem>
              <SelectItem value="Senior Executive">Senior Executive</SelectItem>
              <SelectItem value="Venture Scout">Venture Scout</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
      />

      <Button className="bg-blue-600" type="submit">Add Scout</Button>
      </form>
    </Form>
    </Card>
    </div>
  )
}