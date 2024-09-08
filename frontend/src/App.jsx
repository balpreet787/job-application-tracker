import { Routes, Route, redirect } from "react-router-dom";
import Login from "./Login";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "./context/SessionContext";

function App() {

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
        <Routes>

          <Route path="/" element={<Navbar />} />
        </Routes>

      </>
    )
  }
}


export default App
