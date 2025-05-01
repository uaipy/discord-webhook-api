import { Request, Response, Router } from 'express';

export default (router: Router): void => {
  router.get('/health', (req: Request, res: Response) => {
    res.status(200).send({ ServerStatus: 'OK' });
  });
};
