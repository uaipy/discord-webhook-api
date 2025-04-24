import { Request, Response, Router } from 'express';

const healthRouter: Router = Router();

healthRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'OK' });
});

export default healthRouter;
