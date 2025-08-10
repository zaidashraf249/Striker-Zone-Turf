import express from 'express';
import {
  loginAdmin,
  verifyToken
} from '../controller/loginController.js';

const loginRouter = express.Router();

// Public
loginRouter.post('/login', loginAdmin);
loginRouter.get('/verify', verifyToken);


export default loginRouter;
