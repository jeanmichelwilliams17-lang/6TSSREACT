import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { Env } from "./env";



export function getDb(env: Env) {
  return drizzle(env.DB, { schema });
}