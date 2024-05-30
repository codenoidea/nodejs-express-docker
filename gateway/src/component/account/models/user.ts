
import { Schema, model, connect } from 'mongoose';


// 1. Create an interface representing a document in MongoDB.
interface IUser {
  email: string;
  password: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  email: String,
  password: String,
  nickname: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});



export default model<IUser>('user', UserSchema);