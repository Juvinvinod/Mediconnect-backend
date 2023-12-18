import { IBooking } from '../../common/types/booking';
import { DeleteResult } from 'mongodb';

export interface IBookingService {
  getSlots(id: string): Promise<IBooking[] | null>;
  bookSlot(
    doctorId: string,
    userId: string,
    bookingId: string,
    payId: string
  ): Promise<IBooking | null>;
  getBookings(id: string): Promise<IBooking[] | null>;
  getDocBookings(id: string): Promise<IBooking[] | null>;
  updateSlots(
    id: string,
    status: string,
    prescription: string
  ): Promise<IBooking | null>;
  findDoc(_id: string, date: string): Promise<IBooking | null>;
  getDocSlots(id: string): Promise<IBooking[] | null>;
  deleteSlot(time: string): Promise<DeleteResult>;
  getAllSlots(): Promise<IBooking[]>;
  getSlotsPerDept(): Promise<IBooking[]>;
  getSlot(id: string): Promise<IBooking[]>;
  cancelSlot(id: string): Promise<null>;
  bookedSlots(): Promise<IBooking[]>;
}
