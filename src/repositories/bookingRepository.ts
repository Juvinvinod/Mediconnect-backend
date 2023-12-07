import { BadRequestError } from '../common/errors/badRequestError';
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
    try {
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
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  // get all docs based on userId
  async getDocs(id: string) {
    try {
      return await Booking.find({ patient_id: id })
        .populate({ path: 'doctor_id', model: 'doctor' })
        .sort({
          date: -1,
          start_time: 1,
        });
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  // get all docs based on doctorId
  async getDoctorDocs(id: string) {
    try {
      return await Booking.find({
        doctor_id: id,
      }).populate({
        path: 'patient_id',
        model: 'user',
      });
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  async updateBookingStatus(id: string, status: string, prescription: string) {
    try {
      console.log(id);
      const slot = await Booking.findOne({ _id: id });
      if (slot) {
        slot.set({ status: status, prescription: prescription });
        return await slot.save();
      }
      throw new NotFoundError('Slot not found');
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //find document with same date
  async findDate(_id: string, date: string) {
    try {
      return await Booking.findOne({ date: date, doctor_id: _id });
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //find all slots created by doctor
  async docSlots(_id: string) {
    try {
      return await Booking.find({
        doctor_id: _id,
        status: 'upcoming',
      });
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //delete a slot
  async deleteSlot(time: string): Promise<DeleteResult> {
    try {
      return await Booking.deleteOne({
        start_time: time,
      });
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //get number of booked slots for each doctors
  async getAllSlots(): Promise<IBooking[]> {
    try {
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
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  async patientsPerDept() {
    try {
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
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  async getSlot(_id: string): Promise<IBooking[]> {
    try {
      return await Booking.find({ _id: _id }).populate([
        {
          path: 'patient_id',
          model: 'user',
        },
        {
          path: 'doctor_id',
          model: 'doctor',
        },
      ]);
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //cancel slot by user
  async cancelSlot(id: string): Promise<null> {
    return await Booking.findByIdAndUpdate(
      { _id: id },
      { status: 'upcoming', patient_id: null, payment: null }
    );
  }
}
