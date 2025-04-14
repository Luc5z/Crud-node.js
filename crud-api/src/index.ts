import express from 'express';
import userRoutes from './routes/userRoutes';
import './database/init';
import cors from 'cors';


const app = express();
const PORT = 3000;
app.use(cors({
  origin: ['http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(cors());

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
