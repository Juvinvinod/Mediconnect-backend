import { NotFoundError } from '../common/errors/notFoundError';
import { IBooking } from '../common/types/booking';
import { Booking } from '../models/bookingModel';

export class BookingRepository {
  //get slots belonging to the id
  async getDoctorSlots(id: string): Promise<IBooking[] | null> {
    return await Booking.find({ doctor_id: id, status: 'upcoming' });
  }

  //book a slot
  async bookSlot(
    doctorId: string,
    userId: string,
    bookingId: string,
    payId: string
  ): Promise<IBooking> {
    const document = await Booking.findOne({
      _id: bookingId,
    });

    if (document) {
      document.patient_id = userId;
      document.payment = payId;
      document.status = 'booked';
      return await document.save();
    }
    throw new NotFoundError('Booking not found');
  }

  // get all docs based on userId
  async getDocs(id: string) {
    return await Booking.find({ patient_id: id });
  }

  // get all docs based on doctorId
  async getDoctorDocs(id: string) {
    return await Booking.find({ doctor_id: id });
  }
}
