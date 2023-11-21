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
}
