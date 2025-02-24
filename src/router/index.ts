import express, { Router } from 'express';
import { adminRouter } from './admin';
import { clientRouter } from './client';
import { authCheckMiddleware } from './client/auth-check-middleware';
export const apiRouter: Router = express.Router();

apiRouter.use('/admin', adminRouter);

apiRouter.use('/client', authCheckMiddleware, clientRouter);