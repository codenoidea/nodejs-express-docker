import IUser from './models/iUser'

// req에 user 사용하기 위해 추가
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}