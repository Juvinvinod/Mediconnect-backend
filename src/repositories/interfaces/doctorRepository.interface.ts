import { IBooking } from '../../common/types/booking';
import { IDoctor } from '../../common/types/doctor';

export interface IDoctorRepository {
  createDoctor(doctorDetails: IDoctor): Promise<IDoctor>;
  getDoctor(id: string): Promise<IDoctor[] | null>;
  getDoctors(): Promise<IDoctor[] | null>;
  updateDoctor(id: string, doctorDetails: IDoctor): Promise<IDoctor | null>;
  findDoctorByEmail(email: string): Promise<IDoctor | null>;
  updateUser(id: string, doctorDetails: IDoctor): Promise<IDoctor | null>;
  blockDoctor(id: string): Promise<IDoctor>;
  unblockDoctor(id: string): Promise<IDoctor>;
  passwordChange(id: string, newPass: string): Promise<IDoctor>;
  createSlot(data: IBooking): Promise<IBooking>;
  getDoctorByEmail(email: string): Promise<IDoctor[] | null>;
}
