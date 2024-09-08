import {CircleUserRound} from "lucide-react";

export default function Header() {
    return (
      <header className="flex justify-between w-full py-2 px-4 border-b border-slate-200 font-bold items-center">
        <h1 className="text-2xl">Coop Dashboard</h1>
        <CircleUserRound />
      </header>


    );
};