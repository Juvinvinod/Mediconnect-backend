import { IBooking } from '../../common/types/booking';
import { IUser } from '../../common/types/user';

export interface IUserService {
  signup(userDetails: IUser): Promise<IUser>;
  login(email: string): Promise<IUser>;
  getUser(id: string): Promise<IUser[]>;
  getUsers(): Promise<IUser[]>;
  getStaffs(): Promise<IUser[]>;
  updatePassword(id: string, newPass: string): Promise<IUser | null>;
  getSLots(): Promise<IBooking[] | null>;
}
