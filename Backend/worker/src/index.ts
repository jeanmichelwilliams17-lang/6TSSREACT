 import { Hono } from 'hono'

import allScouts from './routes/scouts';
import { Env } from './env';
import scoutManagementGet from './routes/managementpagescouts';

 const app = new Hono< {Bindings: Env } >();

 app.route("/scouts", allScouts);

 app.route("/scoutmanagement", scoutManagementGet);
 

export default app