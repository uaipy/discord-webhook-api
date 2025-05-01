import 'dotenv/config';

import setupMiddlewares from '@app/main/config/middlewares';
import setupRoutes from '@app/main/config/routes';
import express, { Express } from 'express';

const app: Express = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
