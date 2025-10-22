 import { Hono } from 'hono'
import { Env } from './env';
import scoutManagementGet from './routes/managementpagescouts';


const app = new Hono< {Bindings: Env } >();



 app.route("/scoutsmanagement", scoutManagementGet);
 

export default app




