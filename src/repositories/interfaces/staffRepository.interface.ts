import { IStaff } from '../../common/types/staff';

export interface IStaffRepository {
  createStaff(staffDetails: IStaff): Promise<IStaff>;
  findStaffByEmail(email: string): Promise<IStaff | null>;
  getStaff(id: string): Promise<IStaff[] | null>;
  getStaffs(): Promise<IStaff[] | null>;
  updateStaff(id: string, staffDetails: IStaff): Promise<IStaff | null>;
  blockStaff(id: string): Promise<IStaff>;
  unblockStaff(id: string): Promise<IStaff>;
  passwordChange(id: string, newPass: string): Promise<IStaff>;
  getStaffByEmail(email: string): Promise<IStaff[] | null>;
}
