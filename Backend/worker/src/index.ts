 import { Hono } from 'hono'

 type Bindings = {
	DB: D1Database
 }

 const app = new Hono< {Bindings: Bindings } >();

 app.get("/", async c => {
	const resp = await c.env.DB.prepare("SELECT first_name, last_name FROM scouts WHERE crew IN ('Crew A');").all();

	const data = resp.results;
	return(c.json({data}))
 })

export default app