import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { JobRecord } from "../types/jobRecord";
import { EditJobModal } from "./editModal";

type DemoPageProps = {
  jobRecords: JobRecord[];
};

export default function DemoPage({ jobRecords }: DemoPageProps) {
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

  const handleSave = (updatedJob: JobRecord) => {
    const updatedData = data.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    );
    setData(updatedData);
    setIsModalOpen(false);
  };

  const handleChange = (field: keyof JobRecord, value: string) => {
    if (selectedJob) {
      setSelectedJob({ ...selectedJob, [field]: value });
    }
  };

  return (
    <div className="container min-w-full p-4 rounded-md">
      <DataTable columns={columns(handleEdit)} data={data} />

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
