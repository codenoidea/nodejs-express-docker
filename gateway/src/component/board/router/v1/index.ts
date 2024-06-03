import express, { Request, Response, NextFunction } from "express";
import { ServiceError, credentials } from "@grpc/grpc-js";
const router = express.Router();
import { mandatory, optional } from "../../../../middleware/authoration";
import {
  BoardResult,
  BoardServiceClient,
  GetBoardRequest,
  GetBoardResponse,
  ListBoardRequest,
  ListBoardResponse,
  UpdateBoardRequest,
  UpdateBoardResponse,
  DeleteBoardRequest,
  DeleteBoardResponse,
  CreateBoardRequest,
  CreateBoardResponse,
} from "../../../../protos/board";
import config from "../../../../config";

const client = new BoardServiceClient(
  config.BOARD_HOST,
  credentials.createInsecure()
);

router.get(
  "/",
  optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: ListBoardRequest = {
        limit: Number(req.query.limit) || 20,
        page: Number(req.query.page) || 1,
        userId: req.user?.userId,
      };
      console.log(`params;`, params);
      // client.list(
      //   params,
      //   (err: ServiceError | null, response: ListBoardResponse) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     console.log(JSON.stringify(response));

      //     res.json(response);
      //   }
      // );

      client.list(params, (err, resp) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Response :", resp);
        }
        res.json(resp);
      });
    } catch (e) {
      console.log("list error;", e);
      res.json({ e });
    }
  }
);

router.post(
  "/",
  mandatory,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: CreateBoardRequest = {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.userId,
      };

      client.create(params, (err, resp) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Response :", resp);
        }
        res.json(resp);
      });
    } catch (e) {
      res.json({ e });
    }
  }
);

router.put(
  "/:id",
  mandatory,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: UpdateBoardRequest = {
        id: Number(req.params.id),
        title: req.body.title,
        content: req.body.content,
        userId: req.user.userId,
      };
      client.update(
        params,
        (err: ServiceError | null, response: UpdateBoardResponse) => {
          if (err) {
            console.log(err);
          }
          console.log(JSON.stringify(response));

          res.json(response);
        }
      );
    } catch (e) {
      res.json({ e });
    }
  }
);

router.delete(
  "/:id",
  mandatory,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: DeleteBoardRequest = {
        id: Number(req.params.id),
        userId: req.user.userId,
      };
      client.delete(
        params,
        (err: ServiceError | null, response: DeleteBoardResponse) => {
          if (err) {
            console.log(err);
          }
          console.log(JSON.stringify(response));

          res.json(response);
        }
      );
    } catch (e) {
      res.json({ e });
    }
  }
);

router.get(
  "/:id",
  optional,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params: GetBoardRequest = {
        id: Number(req.params.id),
        userId: req.user?.userId,
      };
      client.info(params, (err, resp) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Response :", resp);
        }
        res.json(resp);
      });
    } catch (e) {
      console.log(e);
      res.json({ e });
    }
  }
);

export default router;
