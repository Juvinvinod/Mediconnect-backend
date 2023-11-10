import { User } from '../models/userModel';
import { IUser } from '../common/types/user';

export class UserRepository {
  // create a new user and save it in database
  async createUser(userDetails: IUser): Promise<IUser> {
    const user = User.build(userDetails);
    return await user.save();
  }

  //check for the user document in the database
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  //function to get all user documents
  async getUsers(): Promise<IUser[] | null> {
    return await User.find({ role: 'user' });
  }

  //function to get all staff documents
  async getStaffs(): Promise<IUser[] | null> {
    return await User.find({ role: 'staff' });
  }

  // function to get a single users
  async getUser(id: string): Promise<IUser | null> {
    return await User.findOne({ _id: id });
  }
}
