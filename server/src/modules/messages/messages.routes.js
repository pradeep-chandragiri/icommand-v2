import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { sendMessage } from './messages.controller.js';

const messageRoutes = express.Router();

messageRoutes.post('/:chatid/messages', authenticate, sendMessage);

export default messageRoutes;