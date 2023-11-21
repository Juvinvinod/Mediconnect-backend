import { NotFoundError } from '../common/errors/notFoundError';
import { IBooking } from '../common/types/booking';
import { IDoctor } from '../common/types/doctor';
import { Booking } from '../models/bookingModel';
import { Doctor } from '../models/doctorModel';

export class DoctorRepository {
  // create a new doctor
  async createDoctor(doctorDetails: IDoctor): Promise<IDoctor> {
    const doctor = Doctor.build(doctorDetails);
    return await doctor.save();
  }

  //function to get  doctor documents
  async getDoctor(id: string): Promise<IDoctor[] | null> {
    return await Doctor.find({ _id: id });
  }

  //function to get all doctor documents
  async getDoctors(): Promise<IDoctor[] | null> {
    return await Doctor.find({ role: 'doctor' });
  }

  //function to update doctor
  async updateDoctor(
    id: string,
    doctorDetails: IDoctor
  ): Promise<IDoctor | null> {
    return await Doctor.findByIdAndUpdate({ _id: id }, doctorDetails);
  }

  //check for the doctor document in the database
  async findDoctorByEmail(email: string): Promise<IDoctor | null> {
    return await Doctor.findOne({ email });
  }

  //update doctor details
  async updateUser(
    id: string,
    doctorDetails: IDoctor
  ): Promise<IDoctor | null> {
    return await Doctor.findByIdAndUpdate({ _id: id }, doctorDetails);
  }

  //function to block a doctor
  async blockDoctor(id: string): Promise<IDoctor> {
    const doctor = await Doctor.findOne({ _id: id });
    if (doctor) {
      doctor.set({ is_blocked: true });
      return await doctor.save();
    }
    throw new NotFoundError('Doctor not found');
  }

  //function to block a doctor
  async unblockDoctor(id: string): Promise<IDoctor> {
    const doctor = await Doctor.findOne({ _id: id });
    if (doctor) {
      doctor.set({ is_blocked: false });
      return await doctor.save();
    }
    throw new NotFoundError('User not found');
  }

  //function to update password doctor
  async passwordChange(id: string, newPass: string): Promise<IDoctor> {
    const doctor = await Doctor.findOne({ _id: id });
    if (doctor) {
      doctor.set({ password: newPass });
      return await doctor.save();
    }
    throw new NotFoundError('Doctor not found');
  }

  //create a booking slot
  async createSlot(data: IBooking): Promise<IBooking> {
    const slot = Booking.build(data);
    return await slot.save();
  }
}
