import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );


const Navbar = () => {
    return (
        <header>
            <div>
                Japper
            </div>
            <div>
            <button onClick={() => handleSignOut()}>Sign out</button>
            </div>
        </header>
    );
}

const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.reload(); 
    } else {
        console.log("Error signing out:", error.message);
    }
};


export default Navbar;