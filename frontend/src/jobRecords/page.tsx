import { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  const mockData = [
    {
      "date": "2025-06-27T21:14:25.842Z",
      "title": "Regional Communications Executive",
      "company": "Koss Group",
      "status": "pending",
      "id": "1"
    },
    {
      "date": "2024-10-09T21:12:55.806Z",
      "title": "Forward Optimization Orchestrator",
      "company": "Johns, Schmidt and White",
      "status": "rejected",
      "id": "2"
    },
    {
      "date": "2024-12-01T04:23:34.103Z",
      "title": "Legacy Implementation Representative",
      "company": "Graham LLC",
      "status": "offered",
      "id": "3"
    },
    {
      "date": "2024-10-08T10:49:42.498Z",
      "title": "Future Accounts Facilitator",
      "company": "Walter and Sons",
      "status": "applied",
      "id": "4"
    },
    {
      "date": "2025-01-20T04:22:06.198Z",
      "title": "Lead Branding Producer",
      "company": "Baumbach and Sons",
      "status": "rejected",
      "id": "5"
    },
    {
      "date": "2025-04-30T09:57:18.249Z",
      "title": "Customer Quality Supervisor",
      "company": "O'Reilly, Gleason and Collier",
      "status": "applied",
      "id": "6"
    },
    {
      "date": "2024-10-06T23:14:35.856Z",
      "title": "Principal Interactions Consultant",
      "company": "Rutherford, Labadie and Yundt",
      "status": "pending",
      "id": "7"
    },
    {
      "date": "2024-11-29T23:21:59.396Z",
      "title": "Dynamic Division Administrator",
      "company": "Runolfsson, Bernier and Satterfield",
      "status": "offered",
      "id": "8"
    },
    {
      "date": "2025-02-11T20:51:32.759Z",
      "title": "Forward Quality Officer",
      "company": "Sporer - Ondricka",
      "status": "pending",
      "id": "9"
    },
    {
      "date": "2025-04-15T18:05:59.675Z",
      "title": "Chief Research Orchestrator",
      "company": "Becker Group",
      "status": "applied",
      "id": "10"
    },
    {
      "date": "2024-12-08T00:29:53.823Z",
      "title": "Lead Data Supervisor",
      "company": "Ziemann and Sons",
      "status": "offered",
      "id": "11"
    },
    {
      "date": "2025-02-12T14:54:52.421Z",
      "title": "Forward Communications Designer",
      "company": "Hahn - Beatty",
      "status": "applied",
      "id": "12"
    },
    {
      "date": "2025-01-09T00:59:08.883Z",
      "title": "Future Mobility Associate",
      "company": "Halvorson, Wolf and Zieme",
      "status": "rejected",
      "id": "13"
    },
    {
      "date": "2024-11-28T12:09:31.374Z",
      "title": "Human Division Agent",
      "company": "Frami - McKenzie",
      "status": "pending",
      "id": "14"
    },
    {
      "date": "2025-05-11T06:08:28.732Z",
      "title": "Global Optimization Planner",
      "company": "Armstrong LLC",
      "status": "rejected",
      "id": "15"
    },
    {
      "date": "2025-04-29T01:17:47.442Z",
      "title": "Global Configuration Consultant",
      "company": "Rowe - Auer",
      "status": "pending",
      "id": "16"
    },
    {
      "date": "2024-10-19T18:57:00.054Z",
      "title": "Forward Division Designer",
      "company": "Langworth, Keebler and Leannon",
      "status": "offered",
      "id": "17"
    },
    {
      "date": "2025-07-04T08:29:56.795Z",
      "title": "Chief Research Representative",
      "company": "Lowe - Graham",
      "status": "applied",
      "id": "18"
    }
  ]
  return(mockData)
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div className="container min-w-full p-4 rounded-md">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
