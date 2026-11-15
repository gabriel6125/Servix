import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'
const router = Router();

router.get('/', (_,res) => {
    return res.send('Olá, Dev');
})

router.post('/teste', (req,res) => {
    console.log(req.body);
    return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
})

export default router;