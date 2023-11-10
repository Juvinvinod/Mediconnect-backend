import { IDoctor } from '../common/types/doctor';
import { Doctor } from '../models/doctorModel';

export class DoctorRepository {
  // create a new doctor
  async createDoctor(doctorDetails: IDoctor): Promise<IDoctor> {
    const doctor = Doctor.build(doctorDetails);
    return await doctor.save();
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
}
