import { BadRequestError } from '../common/errors/badRequestError';
import { NotFoundError } from '../common/errors/notFoundError';
import { IDoctor } from '../common/types/doctor';
import { DoctorRepository } from '../repositories/doctorRepository';

export class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor() {
    this.doctorRepository = new DoctorRepository();
  }

  //create doctor
  async signup(doctorDetails: IDoctor): Promise<IDoctor> {
    const existingDoctor = await this.doctorRepository.findDoctorByEmail(
      doctorDetails.email
    );
    if (existingDoctor) {
      throw new BadRequestError('User already exists');
    } else {
      return await this.doctorRepository.createDoctor(doctorDetails);
    }
  }

  //login function
  async login(email: string): Promise<IDoctor> {
    const doctor = await this.doctorRepository.findDoctorByEmail(email);
    if (!doctor) {
      throw new NotFoundError('Email not found');
    } else {
      return doctor;
    }
  }

  //get doctor
  async getDoctor(id: string): Promise<IDoctor[]> {
    const documents = await this.doctorRepository.getDoctor(id);
    if (!documents) {
      throw new NotFoundError('No doctors found');
    } else {
      return documents;
    }
  }

  //get doctors
  async getDoctors(): Promise<IDoctor[]> {
    const documents = await this.doctorRepository.getDoctors();
    if (!documents) {
      throw new NotFoundError('No doctors found');
    } else {
      return documents;
    }
  }

  // update doctor details with given data
  async UpdateDoctor(id: string, doctor: IDoctor): Promise<IDoctor | null> {
    return await this.doctorRepository.updateDoctor(id, doctor);
  }

  //block a doctor
  async blockDoctor(id: string): Promise<IDoctor | null> {
    return await this.doctorRepository.blockDoctor(id);
  }

  //unblock a doctor
  async unblockDoctor(id: string): Promise<IDoctor | null> {
    return await this.doctorRepository.unblockDoctor(id);
  }

  //update password
  async updatePassword(id: string, newPass: string): Promise<IDoctor | null> {
    return await this.doctorRepository.passwordChange(id, newPass);
  }
}
