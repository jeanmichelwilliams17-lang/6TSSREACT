import { Hono } from "hono";
import { getDb } from "../db";
import { scouts } from "../schema";
import { cors } from "hono/cors";
import { getSupabase } from "../Supabase";
import { eq } from "drizzle-orm";


type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const deleteScout = new Hono<{Bindings: Bindings}>();

deleteScout.use( '/', cors({ 
  origin: 'http://localhost:5173', 
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length',],
  maxAge: 600, 
  credentials: true, 
  
}) 
)


deleteScout.post("/", async (c) => {

  const db = getDb({
  DB: c.env.DB,
  SUPABASE_URL: c.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: c.env.SUPABASE_SERVICE_ROLE_KEY
}); 

  const supabase = getSupabase(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);

  const deletedScoutDBId= await c.req.json();

  const getDeletedScoutSupaId = await db.select({SupaId:scouts.clerk_id}).from(scouts).where(eq(scouts.id, deletedScoutDBId )).get();
  if(!getDeletedScoutSupaId){
    return (c.json({scout: 'notfound'}))
  }
  const supaId= getDeletedScoutSupaId.SupaId

  const { data, error } = await supabase.auth.admin.deleteUser(`${supaId}`)
  if (error) {
  console.error("Error deleting user from Supabase:", error);
  return c.json({ error: "Failed to delete user from Supabase" }, 500);
}
  
  const addScout = await db.delete(scouts).where(eq(scouts.id, deletedScoutDBId )).all()
  


  return(c.json({success: true, scout: "deleted successfully"}));
}
)

export default deleteScout;