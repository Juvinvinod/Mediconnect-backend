import { IBooking } from '../common/types/booking';
import { Booking } from '../models/bookingModel';

export class BookingRepository {
  //get slots belonging to the id
  async getDoctorSlots(id: string): Promise<IBooking[] | null> {
    return await Booking.find({ doctor_id: id });
  }
}
