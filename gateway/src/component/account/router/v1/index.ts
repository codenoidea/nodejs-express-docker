
import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import controller from '../../controller/v1';


router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = { email: req.body.email, nickname: req.body.nickname, password: req.body.password }
    const result = await controller.signup(params);
    res.json({
      result
    });
  } catch (e) {
    throw e
  }
});

export default router;