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
}
