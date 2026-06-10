import { Router } from "express";

const authRouter = Router();


/*
POST /api/auth/register
*/
authRouter.post('/register', (req, res) => {
    // Registration logic here
    res.json({ message: 'User registered successfully' });
});

export default authRouter;