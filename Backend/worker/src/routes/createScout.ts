import { Hono } from "hono";
import { getDb } from "../db";
import { scouts } from "../schema";
import { cors } from "hono/cors";
import { getSupabase } from "../Supabase";


type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const createScout = new Hono<{Bindings: Bindings}>();

createScout.use( '/', cors({ 
  origin: 'http://localhost:5173', 
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length',],
  maxAge: 600, 
  credentials: true, 
  
}) 
)


createScout.post("/", async (c) => {

  const db = getDb({
  DB: c.env.DB,
  SUPABASE_URL: c.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: c.env.SUPABASE_SERVICE_ROLE_KEY
}); 

  const supabase = getSupabase(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);
  const addedScout = await c.req.json();
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(addedScout.email)

  const SupaId = data.user?.id;
  console.log(data.user?.id);
  
  const addScout = await db.insert(scouts).values({
    first_name: addedScout.first_name,
    last_name: addedScout.last_name,
    crew: addedScout.crew,
    rank: addedScout.rank,
    clerk_id: SupaId,
  })
  


  return(c.json(addedScout));
}
)

export default createScout;