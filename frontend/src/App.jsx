import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSession } from "./context/SessionContext";
import { ThemeProvider } from "@/components/theme-provider";
import Login from "./Login";
import Header from "./components/header";
import DashboardCard from "./components/dashboardCard";
import { FolderOpen, Send, Loader, Award, CircleOff } from "lucide-react";
import DemoPage from "./jobRecords/page"; // Adjust import path as needed
import InputBar from "./components/inputBar";

async function getData(userID) {
  try {
    const res = await fetch(`http://localhost:3000/read/?user=${userID}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return data;  
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array if there is an error
  }
}

function App() {
  const [jobRecords, setJobRecords] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [appliedApplications, setAppliedApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [offeredApplications, setOfferedApplications] = useState(0);
  const [rejectedApplications, setRejectedApplications] = useState(0);
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      getData(session.user.id).then((data) => {
        setJobRecords(data);
        console.log(data)
      }).catch(err => {
        console.error('Error fetching data:', err);
      });
    }
  }, [session]);

  if (!session) {
    return (
      <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        </ThemeProvider>
      </>
    );
  }

  return (
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
          <DemoPage jobRecords={jobRecords} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
