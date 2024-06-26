import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routes/users.routes.js';
const app = express();

app.use(cors({
    origin: process.env.CORSORIGIN,
    methods: ['GET', 'HEAD', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    credentials: true,
}))

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use('/api/v1/users', userRouter);

export { app };