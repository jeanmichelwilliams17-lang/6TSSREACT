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
//import type { Scoutmanagementscout } from "@/Types/DB_types";
//import { useState } from "react"
import DatePicker from "./DatePicker"
import MultiSelect from "./SearchableDropdown"
import { useEffect, useState } from "react"


//interface AddAttendanceFormProps{
  //setData: React.Dispatch<React.SetStateAction<Scoutmanagementscout[]>>
//}

interface Option{
  value: number,
  label: string
}

/*
const testOptions = [
  { value: 1, label: "Scout Meeting" },
  { value: 2, label: "Community Service" },
  { value: 3, label: "Sailing Practice" },
  { value: 4, label: "Badge Workshop" },
  { value: 5, label: "Leadership Training" },
];
*/

const backendApi = import.meta.env.VITE_BACKEND_API;

const AttendanceFormSchema = z.object({

  activity: z
  .string()
  .min(2, {
      message: "activity name must be at least 2 characters.",
    })
    .max(30, {
      message: "activity name must not be longer than 30 characters.",
    }),

  notes: z
  .string()
  .min(2, {
      message: "Give a basic description if the activity and what was done.",
  }),

  date: z
  .date({
    error: "Please select a date"
  }),

  activity_type: z
  .enum(["Scout Meeting", "Camps", "Hikes", "Service", "Other", "Swimming", "Kayaking"]),

    attendees: z
    .number()
    .array(),

    leaders: z
    .number()
    .array(),
})
type AttendanceFormValues = z.infer<typeof AttendanceFormSchema>



export default function AddAttendanceForm(
  //{setData}: AddAttendanceFormProps
) {

  //const [date, setDate] = useState<Date | undefined>(undefined)

  const [scoutsForDropwdown, setScoutsForDropdown] = useState<Option[]>([])
  const [leadersForDropwdown, setleadersForDropdown] = useState<Option[]>([])

  useEffect(() =>{
  async function getScoutsForDropdown() {
        const response = await fetch(`${backendApi}/getScoutsForDropdown`);
        if (!response.ok) {
          throw new Error("Failed to fetch scouts");
        } else {
          const data = await response.json();
          setScoutsForDropdown(data);
        }
      }
      getScoutsForDropdown();
    },
    []

   )
   useEffect(() =>{
  async function getLeadersForDropdown() {
        const response = await fetch(`${backendApi}/getLeadersForDropdown`);
        if (!response.ok) {
          throw new Error("Failed to fetch scouts");
        } else {
          const data = await response.json();
          setleadersForDropdown(data);
        }
      }
      getLeadersForDropdown();
    },
    []

   )

  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(AttendanceFormSchema),
    defaultValues: {
      activity: "",
      notes: "",
      date: undefined,
      activity_type: undefined,
      attendees: [],
      leaders: []
    },
    mode: "onChange",
  })

  
  function onSubmit(data: AttendanceFormValues) {
    console.log(data);
      }

  


  return (
    <div className="flex items-center justify-center h-screen" >
      
    <Card className="w-full max-w-[90%] self-center">
      <header className="p-4 text-center font-bold text-2xl">Add Attendance Record</header>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-6 self-center">
        
      <FormField
      control={form.control}
        name ="activity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Activity Name</FormLabel>
            <FormControl>
              <Input 
              className="flex w-full mx-auto
              self-center"               placeholder="Please enter Activity Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name="activity_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Activity Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-[90%] mx-auto">
                <SelectValue placeholder="Select Activity Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Scout Meeting">Scout Meeting</SelectItem>
              <SelectItem value="Camps">Camps</SelectItem>
              <SelectItem value="Hikes">Hikes</SelectItem>
              <SelectItem value="Service">Service</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Swimming">Swimming</SelectItem>
              <SelectItem value="Kayaking">Kayaking</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name ="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description of Activity</FormLabel>
          <FormControl>
            <Input placeholder="Please enter a basic description about the activity" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />

      <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <DatePicker setDate={field.onChange} date={field.value} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />


      

      <div className="grid grid-cols-2 gap-3">
      <FormField
      control={form.control}
      name="attendees"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <MultiSelect
            options={scoutsForDropwdown}
            selected={field.value}
            onChange={field.onChange}
            placeholder="Select Scouts"
            emptyText="No Scouts found."
            ></MultiSelect>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="leaders"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <MultiSelect
            options={leadersForDropwdown}
            selected={field.value}
            onChange={field.onChange}
            placeholder="Select Leaders"
            emptyText="No Leaders found."
            ></MultiSelect>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />
      </div>

      <Button className="bg-blue-600" type="submit">Add Attendance Record</Button>
      </form>
    </Form>
    </Card>
    </div>
  )
}