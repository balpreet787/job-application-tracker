import { ModeToggle } from "./mode-toggle"

export default function Header() {
    return (
      <header className="flex justify-between w-full py-2 px-4 border-b font-bold items-center text-primary bg-card">
        <h1 className="text-2xl">Coop Dashboard</h1>
        <ModeToggle />
      </header>


    );
};