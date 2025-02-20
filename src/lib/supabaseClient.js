import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Test Connection (Now using the correct "users" table)
supabase.from("users").select("*").then(({ data, error }) => {
    if (error) console.error("❌ Supabase Connection Error:", error);
    else console.log("✅ Supabase Connected! Data fetched:", data);
});
