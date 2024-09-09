const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

function supabaseClient() {
    return supabase;
}

module.exports = supabaseClient;
