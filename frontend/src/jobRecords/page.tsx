import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { JobRecord } from "../types/jobRecord";
import { EditJobModal } from "./editModal";

type DemoPageProps = {
  jobRecords: JobRecord[];
  userID: string; // Ensure userID is passed correctly
};

export default function DemoPage({ jobRecords, userID }: DemoPageProps) {
  const [data, setData] = useState<JobRecord[]>(jobRecords);
  const [selectedJob, setSelectedJob] = useState<JobRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(jobRecords); // Update state when jobRecords prop changes
  }, [jobRecords]);

  const handleEdit = (job: JobRecord) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedJob: JobRecord) => {
    try {
      const updatedData = data.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      );
      setData(updatedData);
      const response = await fetch("http://localhost:3000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedJob.id,
          title: updatedJob.title,
          date: updatedJob.date,
          company: updatedJob.company,
          status: updatedJob.status,
          userID: userID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the job record");
      }

      const result = await response.json();
      console.log("Update successful:", result);

    } catch (error) {
      console.error("Error updating job record:", error);
    } finally {
      // Close the modal whether or not the update was successful
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (jobToDelete: JobRecord) => {
    try {
      const updatedData = data.filter((job) => job.id !== jobToDelete.id);
      setData(updatedData);

      const response = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: jobToDelete.id,
          userID: userID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the job record");
      }

      const result = await response.json();
      console.log("Delete successful:", result);

    } catch (error) {
      console.error("Error deleting job record:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleChange = (field: keyof JobRecord, value: string) => {
    if (selectedJob) {
      setSelectedJob({ ...selectedJob, [field]: value });
    }
  };

  return (
    <div className="container min-w-full p-4 rounded-md">
      <DataTable columns={columns(handleEdit, handleDelete)} data={data} />

      <EditJobModal
        isOpen={isModalOpen}
        job={selectedJob}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onChange={handleChange}
        />
    </div>
  );
}
