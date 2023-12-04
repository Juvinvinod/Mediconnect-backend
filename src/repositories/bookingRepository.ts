import { NotFoundError } from '../common/errors/notFoundError';
import { IBooking } from '../common/types/booking';
import { Booking } from '../models/bookingModel';
import { IBookingRepository } from './interfaces/bookingRepository.interface';
import { DeleteResult } from 'mongodb';

export class BookingRepository implements IBookingRepository {
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
    return await Booking.find({ patient_id: id })
      .populate({ path: 'doctor_id', model: 'doctor' })
      .sort({
        date: -1,
        start_time: 1,
      });
  }

  // get all docs based on doctorId
  async getDoctorDocs(id: string) {
    return await Booking.find({
      doctor_id: id,
    }).populate({
      path: 'patient_id',
      model: 'user',
    });
  }

  async updateBookingStatus(id: string, status: string) {
    const slot = await Booking.findOne({ _id: id });
    if (slot) {
      slot.set({ status: status });
      return await slot.save();
    }
    throw new NotFoundError('Slot not found');
  }

  //find document with same date
  async findDate(_id: string, date: string) {
    return await Booking.findOne({ date: date, doctor_id: _id });
  }

  //find all slots created by doctor
  async docSlots(_id: string) {
    return await Booking.find({
      doctor_id: _id,
      status: 'upcoming',
    });
  }

  //delete a slot
  async deleteSlot(time: string): Promise<DeleteResult> {
    return await Booking.deleteOne({
      start_time: time,
    });
  }

  //get number of booked slots for each doctors
  async getAllSlots(): Promise<IBooking[]> {
    const aggregatedDocs: IBooking[] = await Booking.aggregate([
      {
        $match: {
          status: 'booked',
        },
      },
      {
        $lookup: {
          from: 'doctors',
          foreignField: '_id',
          localField: 'doctor_id',
          as: 'doctorInfo',
        },
      },
      { $unwind: '$doctorInfo' },
      {
        $group: {
          _id: '$doctor_id',
          doctorName: { $first: '$doctorInfo.first_name' },
          totalBookings: { $sum: 1 },
        },
      },
    ]);

    return aggregatedDocs;
  }

  async patientsPerDept() {
    const aggregatedDocs: IBooking[] = await Booking.aggregate([
      { $match: { status: 'booked' } },
      {
        $lookup: {
          from: 'doctors',
          foreignField: '_id',
          localField: 'doctor_id',
          as: 'doctorInfo',
        },
      },
      { $unwind: '$doctorInfo' },
      {
        $group: {
          _id: '$doctor_id',
          dept: { $first: '$doctorInfo.department' },
          totalBookings: { $sum: 1 },
        },
      },
    ]);
    return aggregatedDocs;
  }
}
