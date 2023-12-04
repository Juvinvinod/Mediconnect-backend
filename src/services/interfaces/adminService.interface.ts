import { IDept } from '../../common/types/department';
import { IUser } from '../../common/types/user';

export interface IAdminService {
  UpdateUser(id: string, user: IUser): Promise<IUser | null>;
  getUser(id: string): Promise<IUser[] | null>;
  blockUser(id: string): Promise<IUser | null>;
  unblockUser(id: string): Promise<IUser | null>;
  createDept(name: IDept): Promise<IDept | null>;
  getDept(): Promise<IDept[] | null>;
  updateDept(_id: string, dept: string): Promise<IDept | null>;
  getCount(model: string): Promise<number | undefined>;
}
