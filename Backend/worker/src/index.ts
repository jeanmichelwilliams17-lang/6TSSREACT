 import { Hono } from 'hono'
export interface Env {

}

 const app = new Hono< {Bindings: Env } >();

 app.get("/", c => {
	return(c.json({hello: "World"}))
 })

export default app