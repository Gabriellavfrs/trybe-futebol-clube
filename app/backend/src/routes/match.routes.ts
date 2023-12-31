import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();
const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateProgress(req, res),
);
router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateGoals(req, res),
);
router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
