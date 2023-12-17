import { IStaff } from '../../common/types/staff';

export interface IStaffService {
  signup(staffDetails: IStaff): Promise<IStaff>;
  login(email: string): Promise<IStaff>;
  getStaff(id: string): Promise<IStaff[]>;
  getStaffs(): Promise<IStaff[]>;
  UpdateStaff(id: string, staff: IStaff): Promise<IStaff | null>;
  blockStaff(id: string): Promise<IStaff | null>;
  unblockStaff(id: string): Promise<IStaff | null>;
  updatePassword(id: string, newPass: string): Promise<IStaff | null>;
  getStaffByEmail(email: string): Promise<IStaff[]>;
}
