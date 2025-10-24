import { Hono } from "hono";
import { getDb } from "../db";
import { leaders, scouts } from "../schema";
import { cors } from "hono/cors";
import { getSupabase } from "../Supabase";


type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const createLeader = new Hono<{Bindings: Bindings}>();

createLeader.use( '/', cors({ 
  origin: 'http://localhost:5173', 
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length',],
  maxAge: 600, 
  credentials: true, 
  
}) 
)


createLeader.post("/", async (c) => {

  const db = getDb({
  DB: c.env.DB,
  SUPABASE_URL: c.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: c.env.SUPABASE_SERVICE_ROLE_KEY
}); 

  const supabase = getSupabase(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);
  const addedLeader = await c.req.json();
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(addedLeader.email,{redirectTo:'http://localhost:5173/register'})

  const SupaId = data.user?.id;
  console.log(data.user?.id);
  
  const addLeader = await db.insert(leaders).values({
    first_name: addedLeader.first_name,
    last_name: addedLeader.last_name,
    section: addedLeader.section,
    rank: addedLeader.rank,
    clerk_id: SupaId,
  })
  


  return(c.json(addedLeader));
}
)

export default createLeader;