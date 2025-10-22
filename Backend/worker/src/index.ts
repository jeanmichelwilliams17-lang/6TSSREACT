 import { Hono } from 'hono'
import scoutManagementGet from './routes/managementpagescouts';
import createScout from './routes/createScout';
type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const app = new Hono< {Bindings: Bindings } >();



 app.route("/scoutsmanagement", scoutManagementGet);
 app.route("/createScout", createScout)
 

export default app




