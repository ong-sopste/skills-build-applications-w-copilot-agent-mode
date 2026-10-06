import Activity from '../models/Activity';
import { createResourceRouter } from './resourceRouter';

const activitiesRouter = createResourceRouter(Activity);

export default activitiesRouter;