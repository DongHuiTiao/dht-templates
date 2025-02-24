import { Router } from 'express';
import { classRouter } from './class';
import { studentRouter } from './student';

export const adminRouter = Router()

adminRouter.use('/class', classRouter)

adminRouter.use('/student', studentRouter)
