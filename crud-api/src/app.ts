import express from 'express';
import userRoutes from './routes/userRoutes';
import './database/init';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(userRoutes);

export default app;
