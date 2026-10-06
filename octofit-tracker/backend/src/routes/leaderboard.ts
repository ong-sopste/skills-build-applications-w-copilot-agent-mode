import Leaderboard from '../models/Leaderboard';
import { createResourceRouter } from './resourceRouter';

const leaderboardRouter = createResourceRouter(Leaderboard);

export default leaderboardRouter;