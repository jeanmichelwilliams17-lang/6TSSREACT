import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { Env } from "./env";

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

export function getDb({DB}: Bindings) {
  return drizzle(DB, { schema });
}