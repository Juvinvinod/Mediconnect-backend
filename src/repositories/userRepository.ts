import { User } from '../models/userModel';
import { IUser } from '../common/types/user';
import { NotFoundError } from '../common/errors/notFoundError';
import { IBooking } from '../common/types/booking';
import { Booking } from '../models/bookingModel';
import { IUserRepository } from './interfaces/userRepository.interface';

export class UserRepository implements IUserRepository {
  // create a new user and save it in database
  async createUser(userDetails: IUser): Promise<IUser> {
    const user = User.build(userDetails);
    return await user.save();
  }

  //check for the user document in the database
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  //function to get all user documents from database
  async getUsers(): Promise<IUser[] | null> {
    return await User.find({ role: 'user' });
  }

  //function to get all staff documents from database
  async getStaffs(): Promise<IUser[] | null> {
    return await User.find({ role: 'staff' });
  }

  // function to get a single user from database
  async getUser(id: string): Promise<IUser[] | null> {
    return await User.find({ _id: id });
  }

  // function to update user in database
  async updateUser(id: string, userDetails: IUser): Promise<IUser | null> {
    return await User.findByIdAndUpdate({ _id: id }, userDetails);
  }

  //function to update password of user in database
  async passwordChange(id: string, newPass: string): Promise<IUser> {
    const user = await User.findOne({ _id: id });
    if (user) {
      user.set({ password: newPass });
      return await user.save();
    }
    throw new NotFoundError('user not found');
  }

  //function to get all slots
  async getSlots(): Promise<IBooking[] | null> {
    return await Booking.find({});
  }
}
