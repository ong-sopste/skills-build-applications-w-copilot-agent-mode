import Team from '../models/Team';
import { createResourceRouter } from './resourceRouter';

const teamsRouter = createResourceRouter(Team);

export default teamsRouter;