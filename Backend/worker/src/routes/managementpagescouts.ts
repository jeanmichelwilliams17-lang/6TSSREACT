import { Hono } from "hono";
import { getDb } from "../db";
import { scouts } from "../schema";
import { cors } from "hono/cors";

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const scoutManagementGet = new Hono<{Bindings: Bindings}>();

scoutManagementGet.use( '/', cors({ 
  origin: 'http://localhost:5173', 
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length',],
  maxAge: 600, 
  credentials: true, 
  
}) 
)

scoutManagementGet.get("/", async (c) => {
  const db = getDb({
  DB: c.env.DB,
  SUPABASE_URL: c.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: c.env.SUPABASE_SERVICE_ROLE_KEY
}); 
  
  const allScouts = await db.select({ id: scouts.id, first_name: scouts.first_name, last_name: scouts.last_name, crew: scouts.crew, rank: scouts.rank}).from(scouts).all();

  return c.json(allScouts);
});

export default scoutManagementGet;