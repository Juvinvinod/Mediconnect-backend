import { IBooking } from '../../common/types/booking';
import { IDoctor } from '../../common/types/doctor';

export interface IDoctorService {
  signup(doctorDetails: IDoctor): Promise<IDoctor>;
  login(email: string): Promise<IDoctor>;
  getDoctor(id: string): Promise<IDoctor[]>;
  getDoctors(): Promise<IDoctor[]>;
  UpdateDoctor(id: string, doctor: IDoctor): Promise<IDoctor | null>;
  blockDoctor(id: string): Promise<IDoctor | null>;
  unblockDoctor(id: string): Promise<IDoctor | null>;
  updatePassword(id: string, newPass: string): Promise<IDoctor | null>;
  createSlot(details: IBooking): Promise<IBooking>;
  getDoctorByEmail(email: string): Promise<IDoctor[]>;
}
