
import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { mandatory, optional } from '../../../../middleware/authoration';


router.get('/', optional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = { limit: req.query.limit, page: req.query.page, userId: req.user?.userId }
    console.log(`params;`, params)
    const result = ''
    res.json({
      result
    });
  } catch (e) {
    res.json({ e })
  }
});


router.post('/', mandatory, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = { title: req.body.title, content: req.body.content, userId: req.user?.userId }
    console.log(`params;`, params)
    const result = ""
    res.json({
      result
    });
  } catch (e) {
    res.json({ e })
  }
});

router.put('/:id', mandatory, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = { email: req.body.email, password: req.body.password, userId: req.user?.userId }
    const result = ""
    res.json({
      result
    });
  } catch (e) {
    res.json({ e })
  }
});

router.delete('/:id', mandatory, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = { email: req.body.email, password: req.body.password, userId: req.user?.userId }
    const result = ""
    res.json({
      result
    });
  } catch (e) {
    res.json({ e })
  }
});

router.get('/:id', optional, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = { email: req.body.email, password: req.body.password, userId: req.user?.userId }
    const result = ""
    res.json({
      result
    });
  } catch (e) {
    res.json({ e })
  }
});

export default router;