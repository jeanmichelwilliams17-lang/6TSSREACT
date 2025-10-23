import { IsEqual } from './../../../../Frontend/6TSSFRONTEND/node_modules/react-hook-form/dist/types/utils.d';
import { Hono } from "hono";
import { getDb } from "../db";
import { leaders, scouts } from "../schema";
import { cors } from "hono/cors";
import { eq } from 'drizzle-orm';

type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const getRole = new Hono<{Bindings: Bindings}>();

getRole.use( '/', cors({ 
  origin: 'http://localhost:5173', 
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length',],
  maxAge: 600, 
  credentials: true, 
  
}) 
)

getRole.get("/", async (c) => {
  const db = getDb({
  DB: c.env.DB,
  SUPABASE_URL: c.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: c.env.SUPABASE_SERVICE_ROLE_KEY
}); 

const authId = c.req.param("authId");
if (!authId) {
  return c.json({ error: "User ID not found" }, 400);
}
  
  const leader = await db.select().from(leaders).where(eq(leaders.clerk_id, authId )).get();

  if(leader){
    return c.json({ role: "leader" })
  }

  const scout = await db.select().from(scouts).where(eq(scouts.clerk_id, authId )).get();

  if (scout){
    return c.json({ role: "scout" })
  }

  return c.json({ role: "none" });
});

export default getRole;