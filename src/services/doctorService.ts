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
  async getDoctors(): Promise<IDoctor[]> {
    const documents = await this.doctorRepository.getDoctors();
    if (!documents) {
      throw new NotFoundError('No doctors found');
    } else {
      return documents;
    }
  }
}
