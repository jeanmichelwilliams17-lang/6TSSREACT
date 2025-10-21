import { Hono } from "hono";
import { getDb } from "../db";
import { scouts } from "../schema";
import { Env } from "../env";


const allScouts = new Hono<{Bindings: Env}>();

allScouts.get("/", async (c) => {
  const db = getDb(c.env); 
  
  const allScouts = await db.select().from(scouts).all();

  return c.json(allScouts);
});

export default allScouts;