import mongoose, { Document, Model, Schema } from 'mongoose';
import { IDoctor } from '../common/types/doctor';

//interface for doctor model
export interface DoctorDoc extends Document {
  first_name: string;
  last_name: string;
  password: string;
  mobile: number;
  department: string;
  doctor_fees: string;
  email: string;
  role: string;
  is_blocked?: boolean;
  is_admin?: boolean;
}

// let typescript know there is a statics method in userSchema
interface DoctorModel extends Model<DoctorDoc> {
  build(attrs: IDoctor): DoctorDoc;
}

//doctor model
const doctorSchema = new Schema({
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
    default: 'doctor',
  },
  department: {
    type: String,
    required: true,
  },
  doctor_fees: {
    type: String,
    required: true,
  },
});

doctorSchema.statics.build = (attrs: IDoctor) => {
  return new Doctor(attrs);
};

const Doctor = mongoose.model<DoctorDoc, DoctorModel>('doctor', doctorSchema);

export { Doctor };
