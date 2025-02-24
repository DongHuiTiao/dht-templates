import { Router } from 'express';
import { authRouter } from './auth';
import { classRouter } from './class';
export const clientRouter = Router()

clientRouter.use('/auth', authRouter)

clientRouter.use('/class', classRouter)

