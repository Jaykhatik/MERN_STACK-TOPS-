import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
const app=express();

app.use(express.json());
app.use(morgan("dev"))
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'Server is running' });
});

export default app;