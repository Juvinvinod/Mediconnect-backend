import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../common/types/user';

// interface for user-model
export interface UserDoc extends Document {
  first_name: string;
  last_name: string;
  password: string;
  mobile: number;
  email: string;
  role: string;
  is_blocked?: boolean;
  is_admin?: boolean;
  is_verified?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
}

// let typescript know there is a statics method in userSchema
interface UserModel extends Model<UserDoc> {
  build(attrs: IUser): UserDoc;
}

// user model
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  is_blocked: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

// method to create new user
userSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User };
