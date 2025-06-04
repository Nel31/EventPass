import { createClient } from "@supabase/supabase-js"

// Provide fallback values for development/preview
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"

// Only create the client if we have real values
export const supabase = supabaseUrl.includes("placeholder") ? null : createClient(supabaseUrl, supabaseAnonKey)

export default supabase
