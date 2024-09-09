import { useEffect, useState } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import { useSession } from "./context/SessionContext";
import { ThemeProvider } from "@/components/theme-provider";
import Login from "./Login";
import Navbar from "./Navbar";
import Header from "./components/header";
import DashboardCard from "./components/dashboardCard";
import { FolderOpen, Send, Loader, Award, CircleOff } from "lucide-react";
import Page from "./jobRecords/page";
import InputBar from "./components/inputBar";

function App() {
  const [totalApplications, setTotalApplications] = useState(0);
  const [appliedApplications, setAppliedApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [offeredApplications, setOfferedApplications] = useState(0);
  const [rejectedApplications, setRejectedApplications] = useState(0);
  const { session, setSession } = useSession();

  if (!session) {
    return (
      <>
        <Routes>

          <Route path="/" element={<Login />} />
        </Routes>

      </>
    )
  }
  else {
    return (
      <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="flex flex-col gap-4">
            <Header />
            <div className="flex gap-4 px-4">
              <DashboardCard title="Total" value={totalApplications} icon={FolderOpen} />
              <DashboardCard title="Applied" value={appliedApplications} icon={Send} />
              <DashboardCard title="Pending" value={pendingApplications} icon={Loader} />
              <DashboardCard title="Offered" value={offeredApplications} icon={Award} />
              <DashboardCard title="Rejected" value={rejectedApplications} icon={CircleOff} />
            </div>
            <div className="flex gap-4 px-4">
              <InputBar />
            </div>
            <div className="flex justify-center mb-4">
              <Page />
            </div>
          </div>
        </ThemeProvider>
      </>
    )
  }
}


export default App
