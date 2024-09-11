import { MoreHorizontal } from "lucide-react"
import { JobRecord } from "@/types/jobRecord"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function RowAction({ record, handleEdit, handleDelete }: { record: JobRecord, handleEdit: (record: JobRecord) => void, handleDelete: (record: JobRecord) => void }) {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => handleEdit(record)}>
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleDelete(record)}>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
