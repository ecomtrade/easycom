import express from 'express';
import brandController from './brand.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';
import upload from '../../../uploadImage';


export const brandRouter = express.Router();
brandRouter.route('/main-list').get(sanitize(), jwtStrategy, brandController.getMainList);