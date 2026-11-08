import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDB } from './configs/mongodb.config.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';
import chatsRoutes from './modules/chats/chats.routes.js';
import messageRoutes from './modules/messages/messages.routes.js';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(helmet());
app.use(cookieParser());

// database connection
connectDB();

app.get('/api/health', (req, res) => {
    res.send('Server is working fine.');
})

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatsRoutes);
app.use('/api/messages', messageRoutes);

// global error handler
app.use(errorHandler);

export default app;