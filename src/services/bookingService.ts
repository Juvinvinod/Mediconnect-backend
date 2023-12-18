import { IBooking } from '../common/types/booking';
import { BookingRepository } from '../repositories/bookingRepository';
import { IBookingService } from './interfaces/bookingService.interface';

export class BookingService implements IBookingService {
  private bookingRepository: BookingRepository;

  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  //get slots using id
  async getSlots(id: string): Promise<IBooking[] | null> {
    return await this.bookingRepository.getDoctorSlots(id);
  }

  //book a slot
  async bookSlot(
    doctorId: string,
    userId: string,
    bookingId: string,
    payId: string
  ) {
    return await this.bookingRepository.bookSlot(
      doctorId,
      userId,
      bookingId,
      payId
    );
  }

  //get userBookings
  async getBookings(id: string) {
    return await this.bookingRepository.getDocs(id);
  }

  //get userBookings
  async getDocBookings(id: string) {
    return await this.bookingRepository.getDoctorDocs(id);
  }

  //update Bookings
  async updateSlots(id: string, status: string, prescription: string) {
    return await this.bookingRepository.updateBookingStatus(
      id,
      status,
      prescription
    );
  }

  //find if document exists
  async findDoc(_id: string, date: string) {
    return await this.bookingRepository.findDate(_id, date);
  }

  //find the doctors slots in db
  async getDocSlots(id: string) {
    return await this.bookingRepository.getDoctorSlots(id);
  }

  //delete slot document in db
  async deleteSlot(time: string) {
    return await this.bookingRepository.deleteSlot(time);
  }

  //get all booked documents
  async getAllSlots(): Promise<IBooking[]> {
    return await this.bookingRepository.getAllSlots();
  }

  //get all booked documents per department
  async getSlotsPerDept() {
    return await this.bookingRepository.patientsPerDept();
  }

  //get a slot detail
  async getSlot(id: string) {
    return await this.bookingRepository.getSlot(id);
  }

  //cancel slot
  async cancelSlot(id: string): Promise<null> {
    return await this.bookingRepository.cancelSlot(id);
  }

  //get all booked slots
  async bookedSlots(): Promise<IBooking[]> {
    return await this.bookingRepository.allBookedSlots();
  }
}
