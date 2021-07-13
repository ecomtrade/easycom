import express from 'express';
import categoryController from './category.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';
import upload from '../../../uploadImage';


export const categoryRouter = express.Router();
categoryRouter.route('/main-list').get(sanitize(), jwtStrategy, categoryController.getMainList);
categoryRouter.route('/create').post(sanitize(), jwtStrategy, upload.single('photo'), categoryController.addCategory);
categoryRouter.route('/delete/:id').delete(sanitize(), jwtStrategy, categoryController.deleteCategory);
categoryRouter.route('/main-list/update').put(sanitize(), jwtStrategy, upload.single('photo'), categoryController.getMainListUpdate);










