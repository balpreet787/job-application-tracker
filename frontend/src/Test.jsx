import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
const test = () => {
    return (
        <div>
        <h1>Test</h1>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
    );
    }

export default test;