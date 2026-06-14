import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static homepage
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve basic API info on root if static files not built
app.get('/', (req, res) => {
  res.send('<h1>Poster Maker API</h1><p>API is running...</p>');
});

app.use('/', apiRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
