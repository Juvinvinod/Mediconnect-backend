import { User } from '../models/userModel';
import { IUser } from '../common/types/user';

export class UserRepository {
  async createUser(userDetails: IUser): Promise<IUser> {
    const user = User.build(userDetails);
    return await user.save();
  }
}
