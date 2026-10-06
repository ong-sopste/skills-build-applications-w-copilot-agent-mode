import Workout from '../models/Workout';
import { createResourceRouter } from './resourceRouter';

const workoutsRouter = createResourceRouter(Workout);

export default workoutsRouter;