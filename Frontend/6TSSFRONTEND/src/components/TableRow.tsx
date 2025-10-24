import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import DeleteButton from "./DeleteButton"
import type { Scoutmanagementscout } from "@/Types/DB_types"

interface RowForTableProps{
  data: Scoutmanagementscout
  setData: React.Dispatch<React.SetStateAction<Scoutmanagementscout[]>>
}

export default function RowForTable({data, setData}: RowForTableProps){
  return(

    <TableRow key={data.id}>
    <TableCell className="font-medium">{data.first_name}</TableCell>
    <TableCell>{data.last_name}</TableCell>
    <TableCell>{data.crew}</TableCell>
    <TableCell className="text-center">{data.rank}</TableCell>
    <TableCell className="text-center">
      <DeleteButton data={data} setData={setData}></DeleteButton>

    </TableCell>
    </TableRow>
  )
}