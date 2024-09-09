"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type JobRecord = {
  date: Date
  title: string
  company: string
  status: string
  id: string
}

export const columns: ColumnDef<JobRecord>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="">
          <Button
            variant="blank"
            size="noPadding"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Deadline
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return (<div className="text-muted-foreground">{formatted}</div>)
    }
  },
  {
    accessorKey: "title",
    header: () => {
      return (<div className="font-bold text-black">Job Title</div>)
    },
    cell: ({ row }) => {
      return (<div className="font-bold">{row.getValue("title")}</div>)
    },
  },
  {
    accessorKey: "company",
    header: () => <div className="font-medium">Company</div>,
    cell: ({ row }) => {
      const name = row.getValue("company")
      return <div className="text-muted-foreground font-medium">{name}</div>
    }
  },
  {
    accessorKey: "status",
    header: () => {
      return (<div className="font-bold text-black">Status</div>)
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      let color = "";

      switch (status) {
        case "applied":
          color = "text-gray-500"
          break;
        case "pending":
          color = "text-yellow-500"
          break;
        case "rejected":
          color = "text-red-500"
          break;
        case "offered":
          color = "text-green-500"
          break;
      }
      return <div className={`font-medium ${color}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log(user.id)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              Open link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  // ...

]
