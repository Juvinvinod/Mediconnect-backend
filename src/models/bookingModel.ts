import mongoose, { Document, Model, Schema } from 'mongoose';
import { IBooking } from '../common/types/booking';

//interface for doctor model
export interface BookingDoc extends Document {
  doctor_id?: string;
  user_id?: string;
  payment: string;
  date: string;
  start_time: string;
  end_time: string;
  fees: string;
  patient_name: string;
  status?: string;
  patient_id?: string;
  prescription?: string;
}

// let typescript know there is a statics method in userSchema
interface BookingModel extends Model<BookingDoc> {
  build(attrs: IBooking): BookingDoc;
}

//doctor model
const bookingSchema = new Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    // type: String,
    // required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  payment: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  patient_id: {
    // type: String,
    // default: '',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: 'upcoming',
  },
  prescription: {
    type: String,
  },
});

bookingSchema.statics.build = (attrs: IBooking) => {
  return new Booking(attrs);
};

const Booking = mongoose.model<BookingDoc, BookingModel>(
  'booking',
  bookingSchema
);

export { Booking };
