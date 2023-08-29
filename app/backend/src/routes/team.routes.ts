import { Request, Response, Router } from 'express';
import TeamConroller from '../controllers/TeamController';

const teamController = new TeamConroller();
const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

export default router;
