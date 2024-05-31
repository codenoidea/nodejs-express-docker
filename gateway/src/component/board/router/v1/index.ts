
import express, { Request, Response, NextFunction } from 'express';
import { ServiceError, credentials } from '@grpc/grpc-js';
const router = express.Router();
import { mandatory, optional } from '../../../../middleware/authoration';
import { BoardCreate, BoardResult, BoardServiceClient } from '../../../../protos/board';
import config from '../../../../config'

console.log(`config.BOARD_HOST;`, config.BOARD_HOST)
const client = new BoardServiceClient(
  config.BOARD_HOST,
  credentials.createInsecure()
);

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
    const params: BoardCreate = { title: req.body.title, content: req.body.content, userId: req.user?.userId }
    console.log(`params;`, params)

    client.create(
      params,
      (err: ServiceError | null, response: BoardResult) => {
        if (err) {
          console.log(err)
        }
        console.log(JSON.stringify(response));

        res.json(response);
      }
    );
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