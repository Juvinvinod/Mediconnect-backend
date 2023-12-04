import { IDept } from '../../common/types/department';
import { IUser } from '../../common/types/user';

export interface IAdminRepository {
  blockUser(id: string): Promise<IUser>;
  unblockUser(id: string): Promise<IUser>;
  createDept(name: IDept): Promise<IDept | null>;
  getDept(): Promise<IDept[] | null>;
  userCount(): Promise<number>;
  docCount(): Promise<number>;
  staffCount(): Promise<number>;
  updateDept(_id: string, dept: string): Promise<IDept | null>;
}
