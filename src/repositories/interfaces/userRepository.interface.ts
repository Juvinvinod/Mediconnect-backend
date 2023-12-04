import { IBooking } from '../../common/types/booking';
import { IUser } from '../../common/types/user';

export interface IUserRepository {
  createUser(userDetails: IUser): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null>;
  getUsers(): Promise<IUser[] | null>;
  getStaffs(): Promise<IUser[] | null>;
  getUser(id: string): Promise<IUser[] | null>;
  updateUser(id: string, userDetails: IUser): Promise<IUser | null>;
  passwordChange(id: string, newPass: string): Promise<IUser>;
  getSlots(): Promise<IBooking[] | null>;
}
