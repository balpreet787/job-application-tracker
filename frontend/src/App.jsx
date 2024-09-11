import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSession } from "./context/SessionContext";
import { ThemeProvider } from "@/components/theme-provider";
import Login from "./Login";
import Header from "./components/header";
import DashboardCard from "./components/dashboardCard";
import { FolderOpen, Send, Loader, Award, CircleOff } from "lucide-react";
import Page from "./jobRecords/page"; 
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
    return [];
  }
}

function App() {
  const [jobRecords, setJobRecords] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [appliedApplications, setAppliedApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [offeredApplications, setOfferedApplications] = useState(0);
  const [rejectedApplications, setRejectedApplications] = useState(0);
  const [userID, setUserID] = useState();
  const [fetchData, setFetchData] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      setUserID(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (userID) {
      console.log('Fetching data for user:', userID)
      getData(userID)
        .then((data) => {
          console.log('Data fetched:', data);
          setJobRecords(data);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
        setFetchData(false);
    }
  }, [fetchData,userID])
  const handleButtonClick = () => {
    setFetchData(true); 
  };
  

  useEffect(() => {
  const total = jobRecords.length;
  const applied = jobRecords.filter(job => job.status === 'applied').length;
  const pending = jobRecords.filter(job => job.status === 'pending').length;
  const offered = jobRecords.filter(job => job.status === 'offered').length;
  const rejected = jobRecords.filter(job => job.status === 'rejected').length;

  setTotalApplications(total);
  setAppliedApplications(applied);
  setPendingApplications(pending);
  setOfferedApplications(offered);
  setRejectedApplications(rejected);
}, [jobRecords]); 

  

  if (!session) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </ThemeProvider>
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
          <InputBar userID={session.user.id} onButtonClick={handleButtonClick} />
        </div>
        <div className="flex justify-center mb-4">
          <Page jobRecords={jobRecords} userID={userID}/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
