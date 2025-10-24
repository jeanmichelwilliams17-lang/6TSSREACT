import { Check, ChevronsUpDown } from "lucide-react"
import { MdDelete } from "react-icons/md";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useCallback, useMemo, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Table, TableHead } from "./ui/table"
import { Separator } from "./ui/separator"

export type Option = {
  value: number
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: number[]
  onChange: (selected: number[]) => void
  placeholder?: string
  emptyText?: string
  className?: string
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  emptyText = "No options found.",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = useCallback(
    (value: number) => {
      const updatedSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
      onChange(updatedSelected)
    },
    [selected, onChange],
  )

  const selectedLabels = useMemo(
    () =>
      selected
        .map((value) => options.find((option) => option.value === value)?.label)
        .filter(Boolean)
        .join(", "),
    [selected, options],
  )

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
          >
            <span className="truncate">{selected.length > 0 ? selectedLabels : placeholder}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search options..." className="h-9" />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.value} value={String(option.value)} onSelect={() => handleSelect(option.value)}>
                    {option.label}
                    <Check
                      className={cn("ml-auto h-4 w-4", selected.includes(option.value) ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Names</h4>
        {
        selected.map((id) => {
          const option = options.find((o) => o.value === id);
          return(
          < Table key={id}>
            <TableHead>
            <div className="text-sm">{option?.label}</div>
            </TableHead>
            <TableHead className="text-right">
            <Button 
            type="button" 
            className="size-3 hover:bg-red-400" 
            variant={"destructive"}
            onClick={() => {
              const updatedSelected = selected.filter((o) => {
                if(o !== id){
                  return true;
                }else if(o === id){
                  return false;
                }
              }
              
              )
              onChange(updatedSelected)}
            }
            >
              <MdDelete></MdDelete>
            </Button>
            </TableHead>
            <Separator className="my-2" />
          </Table>
          )
          }
        )
        }
      </div>
    </ScrollArea>

    </>
  )
}