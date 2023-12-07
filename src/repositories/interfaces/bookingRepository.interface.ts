import { IBooking } from '../../common/types/booking';
import { DeleteResult } from 'mongodb';

export interface IBookingRepository {
  getDoctorSlots(id: string): Promise<IBooking[] | null>;
  bookSlot(
    doctorId: string,
    userId: string,
    bookingId: string,
    payId: string
  ): Promise<IBooking>;
  getDocs(id: string): Promise<IBooking[] | null>;
  getDoctorDocs(id: string): Promise<IBooking[] | null>;
  updateBookingStatus(
    id: string,
    status: string,
    prescription: string
  ): Promise<IBooking | null>;
  findDate(_id: string, date: string): Promise<IBooking | null>;
  docSlots(_id: string): Promise<IBooking[] | null>;
  deleteSlot(time: string): Promise<DeleteResult>;
  getAllSlots(): Promise<IBooking[]>;
  patientsPerDept(): Promise<IBooking[]>;
  getSlot(_id: string): Promise<IBooking[]>;
  cancelSlot(id: string): Promise<null>;
}
