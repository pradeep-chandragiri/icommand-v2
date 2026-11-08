import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { createChat, deleteChat, getAllChats, getChat, searchChats, updateChat } from './chats.controller.js';

const chatsRoutes = express.Router();

chatsRoutes.post('/create', authenticate, createChat);
chatsRoutes.get('/', authenticate, getAllChats);
chatsRoutes.get('/search', authenticate, searchChats);
chatsRoutes.get('/:chatid', authenticate, getChat);
chatsRoutes.delete('/:chatid', authenticate, deleteChat);
chatsRoutes.put('/update/:chatid', authenticate, updateChat);

export default chatsRoutes;