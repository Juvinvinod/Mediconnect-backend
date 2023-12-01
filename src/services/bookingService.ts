import { IBooking } from '../common/types/booking';
import { BookingRepository } from '../repositories/bookingRepository';

export class BookingService {
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
  async updateSlots(id: string, status: string) {
    return await this.bookingRepository.updateBookingStatus(id, status);
  }

  //find if document exists
  async findDoc(date: string) {
    return await this.bookingRepository.findDate(date);
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
  async getAllSlots() {
    return await this.bookingRepository.getAllSlots();
  }
}
