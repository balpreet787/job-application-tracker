import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { JobRecord } from "../types/jobRecord";

export const columns = (handleEdit: (record: JobRecord) => void, handleDelete: (record: JobRecord) => void): ColumnDef<JobRecord>[] => [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div>
        <Button
          variant="blank"
          size="noPadding"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <h1 className="text-muted-foreground">Deadline</h1>
          <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </div>  
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return <div className="text-muted-foreground">{formatted}</div>;
    },
  },
  {
    accessorKey: "title",
    header: () => <h1 className="font-bold">Job Title</h1>,
    cell: ({ row }) => <h1 className="font-bold text-primary">{row.getValue("title")}</h1>,
  },
  {
    accessorKey: "company",
    header: () => <h1 className="font-medium text-muted-foreground">Company</h1>,
    cell: ({ row }) => <h1 className="text-muted-foreground font-medium">{row.getValue("company")}</h1>,
  },
  {
    accessorKey: "status",
    header: () => <h1 className="font-bold text-primary">Status</h1>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      let color = "";

      switch (status) {
        case "applied":
          color = "text-gray-500";
          break;
        case "pending":
          color = "text-yellow-500";
          break;
        case "rejected":
          color = "text-red-500";
          break;
        case "offered":
          color = "text-green-500";
          break;
      }
      return <h1 className={`font-medium ${color}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</h1>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(job)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(job)}>
              Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
