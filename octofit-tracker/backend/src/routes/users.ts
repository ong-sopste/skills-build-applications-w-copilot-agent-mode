import User from '../models/User';
import { createResourceRouter } from './resourceRouter';

const usersRouter = createResourceRouter(User);

export default usersRouter;