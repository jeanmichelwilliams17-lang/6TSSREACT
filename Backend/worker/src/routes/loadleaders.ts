import { Hono } from "hono";
import { getDb } from "../db";
import { leaders, scouts } from "../schema";
import { cors } from "hono/cors";

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const loadLeaders = new Hono<{Bindings: Bindings}>();

loadLeaders.use( '/', cors({ 
  origin: 'http://localhost:5173', 
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length',],
  maxAge: 600, 
  credentials: true, 
  
}) 
)

loadLeaders.get("/", async (c) => {
  const db = getDb({
  DB: c.env.DB,
  SUPABASE_URL: c.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: c.env.SUPABASE_SERVICE_ROLE_KEY
}); 
  
  const allLeaders = await db.select({ id: leaders.leader_id, first_name: leaders.first_name, last_name: leaders.last_name, section: leaders.section, rank: leaders.rank}).from(leaders).all();

  return c.json(allLeaders);
});

export default loadLeaders;