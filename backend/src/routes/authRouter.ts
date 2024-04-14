import { Router } from 'express';
import { getPerformance } from '../controllers/authController';

const authRouter = Router();
authRouter.get('/', getPerformance);

export default authRouter;
