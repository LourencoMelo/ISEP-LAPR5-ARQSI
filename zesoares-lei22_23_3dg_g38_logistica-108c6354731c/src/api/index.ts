import { Router } from 'express';

import truck from './routes/TruckRoute';
import path from './routes/PathRoute';
import planning from './routes/PlanningRoute';
import role from './routes/RoleRoutes';
import user from './routes/UserRoutes';

export default () => {
	const app = Router();

	path(app);
	truck(app);
	planning(app);
	role(app);
	user(app);
	
	return app
}