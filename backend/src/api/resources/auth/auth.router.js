import express from 'express';
import authController from './auth.controller';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy';
import { sanitize } from '../../../middleware/sanitizer';
import { validateBody, schemas } from '../../../middleware/validator';

export const authRouter = express.Router();
authRouter.route('/rootLogin').post(sanitize(),validateBody(schemas.loginSchema),localStrategy, authController.login);
authRouter.route('/register').post(sanitize(),/* validateBody(schemas.registerSchema), */ authController.addUser);
authRouter.route('/getUserProfile').get(sanitize(), authController.findUser);
// authRouter.route('/user/getAllUserList').get(sanitize(), jwtStrategy, authController.getAllUserList);
// authRouter.route('/user/update').post(sanitize(), jwtStrategy, authController.userUpdate);
// authRouter.route('/user/delete').post(sanitize(), jwtStrategy, authController.deleteUserList);



