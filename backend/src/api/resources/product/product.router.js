import express from 'express';
import productController from './product.controller';
import { jwtStrategy } from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';
import upload from '../../../uploadImage';


export const productRouter = express.Router();
productRouter.route('/main-list').get(sanitize(), jwtStrategy, productController.getMainList);
productRouter.route('/create').post(sanitize(), jwtStrategy, upload.single('photo'), productController.addProduct);
productRouter.route('/delete/:id').delete(sanitize(), jwtStrategy, productController.deleteProduct);
productRouter.route('/main-list/update').put(sanitize(), jwtStrategy, upload.single('photo'), productController.getMainListUpdate);










