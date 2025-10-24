 import { Hono } from 'hono'
import scoutManagementGet from './routes/managementpagescouts';
import createScout from './routes/createScout';
import loadLeaders from './routes/loadleaders';
import createLeader from './routes/createLeader';
import getRole from './routes/getRole';
import deleteScout from './routes/deleteScout';
import getScoutsForDropdowns from './routes/getScoutsForDropdown';
import getLeadersForDropdowns from './routes/getLeadersForDropdown';
type Bindings = {
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
  DB: D1Database
}

const app = new Hono< {Bindings: Bindings } >();



 app.route("/scoutsmanagement", scoutManagementGet);
 app.route("/loadleaders", loadLeaders)
 app.route("/createScout", createScout)
 app.route("/createLeader", createLeader)
 app.route("/getRole/:authId", getRole)
 app.route("/deleteScout", deleteScout)
 app.route("/getScoutsForDropdown", getScoutsForDropdowns)
 app.route("/getLeadersForDropdown", getLeadersForDropdowns)

export default app




