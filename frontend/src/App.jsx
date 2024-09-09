import { useState } from "react";
import Header from "./components/header";
import DashboardCard from "./components/dashboardCard";
import { FolderOpen, Send, Loader, Award, CircleOff} from "lucide-react";
import Page from "./jobRecords/page"


function App() {
  const [totalApplications, setTotalApplications] = useState(0);
  const [appliedApplications, setAppliedApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [offeredApplications, setOfferedApplications] = useState(0);
  const [rejectedApplications, setRejectedApplications] = useState(0);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex gap-4 p-4">
        <DashboardCard title="Total" value={totalApplications} icon={FolderOpen} />
        <DashboardCard title="Applied" value={appliedApplications} icon={Send} />
        <DashboardCard title="Pending" value={pendingApplications} icon={Loader} />
        <DashboardCard title="Offered" value={offeredApplications} icon={Award} />
        <DashboardCard title="Rejected" value={rejectedApplications} icon={CircleOff} />
      </div>
      <div className="flex justify-center px-4">
        <Page />
      </div>
    </>
  );
}

export default App;
