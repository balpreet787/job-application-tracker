import { ModeToggle } from "./mode-toggle"
import { createClient } from "@supabase/supabase-js";
import { useSession } from "../context/SessionContext";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
export default function Header() {
  const { session } = useSession();
  
  if (!session) {
     return (
      <header className="flex justify-between w-full py-2 px-4 border-b font-bold items-center text-primary bg-card">
        <h1 className="text-2xl">Coop Dashboard</h1>
        <ModeToggle />
      </header>
  
    );
  }
  return (
    <header className="flex justify-between w-full py-2 px-4 border-b font-bold items-center text-primary bg-card">
      <h1 className="text-2xl">Coop Dashboard</h1>
      <ModeToggle />
      <button onClick={() => handleSignOut()}>Sign out</button>
    </header>


  );
};

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    window.location.reload();
  } else {
    console.log("Error signing out:", error.message);
  }
};