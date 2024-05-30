import IUser from './models/iUser'

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}