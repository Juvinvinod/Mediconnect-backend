import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from '../common/types/user';
import { IStaff } from '../common/types/staff';

// interface for user-model
export interface StaffDoc extends Document {
  first_name: string;
  last_name: string;
  password: string;
  mobile: number;
  email: string;
  role: string;
  is_blocked?: boolean;
}

// let typescript know there is a statics method in userSchema
interface StaffModel extends Model<StaffDoc> {
  build(attrs: IStaff): StaffDoc;
}

// user model
const staffSchema = new Schema({
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
  role: {
    type: String,
    default: 'staff',
  },
});

// method to create new user
staffSchema.statics.build = (attrs: IUser) => {
  return new Staff(attrs);
};

const Staff = mongoose.model<StaffDoc, StaffModel>('staff', staffSchema);

export { Staff };
