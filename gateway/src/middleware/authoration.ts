import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import config from '../config'

const mandatory = (req: Request, res: Response, next: NextFunction) => {

  try {
    const userToken: any = req.headers.authorization;
    if (userToken) {
      const secretKey: string = config.ACCESS_TOKEN_SECRET;
      const decoded: any = jwt.verify(userToken, secretKey);
      // req에 추가하려면 customType 폴더 추가
      // tsconfig.json에 typeRoots 옵션 추가
      req.user = { ...decoded };
      next();
    }
    res.status(400).send("로그인한 유저만 사용할 수 있는 서비스입니다.");
    return;
  } catch (error) {
    res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    return;
  }
};


const optional = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken = req.headers.authorization;

    if (userToken) {
      const secretKey: string = config.ACCESS_TOKEN_SECRET;
      const decoded: any = jwt.verify(userToken, secretKey);
      req.user = { ...decoded };
      next();
    }
  } catch (error) {
    next();;
  }
};

export { mandatory, optional };