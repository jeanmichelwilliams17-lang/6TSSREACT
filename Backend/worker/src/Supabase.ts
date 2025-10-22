import { createClient } from "@supabase/supabase-js"

export function getSupabase(SUPABASE_URL: string, SUPABASE_SERVICE_ROLE_KEY: string) {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
}