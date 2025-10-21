import { Hono } from "hono";
import { getDb } from "../db";
import { scouts } from "../schema";
import { Env } from "../env";
import { cors } from "hono/cors";


const scoutManagementGet = new Hono<{Bindings: Env}>();

scoutManagementGet.use( '/scoutsmanagement', cors({ 
  origin: 'http://localhost:5173', 
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length',],
  maxAge: 600, credentials: true, 
}) 
)

scoutManagementGet.get("/", async (c) => {
  const db = getDb(c.env); 
  
  const allScouts = await db.select({first_name: scouts.first_name, last_name: scouts.last_name, crew: scouts.crew, rank: scouts.rank}).from(scouts).all();

  return c.json(allScouts);
});

export default scoutManagementGet;