import express from 'express';
import { authRouter } from './resources/auth'
import { categoryRouter } from './resources/category'

 
export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/category', categoryRouter);






