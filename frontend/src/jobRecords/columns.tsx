"use client"

import { ColumnDef } from "@tanstack/react-table"

// Define the shape of job records
export type JobRecord = {
  date: Date
  title: string
  company: string
  status: string
}


// Define the columns for the job records table
export const columns: ColumnDef<JobRecord>[] = [
  {
    accessorKey: "date",
    header: () => <div className="">Deadline</div>,
    cell: ({row}) => {
      const date = new Date(row.getValue("date"))
      const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return(<div className="font-medium">{formatted}</div>)
    }
  },
  {
    accessorKey: "title",
    header: () => {
      return(<div className="font-bold">Title</div>)
    },
    cell: ({row}) => {
      return(<div className="font-bold">{row.getValue("title")}</div>)
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
