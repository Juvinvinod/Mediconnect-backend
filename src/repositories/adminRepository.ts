import { User } from '../models/userModel';
import { IUser } from '../common/types/user';
import { NotFoundError } from '../common/errors/notFoundError';

export class AdminRepository {
  async updateUser(id: string, userDetails: IUser): Promise<IUser | null> {
    return await User.findByIdAndUpdate({ _id: id }, userDetails);
  }

  //function to block a user
  async blockUser(id: string): Promise<IUser> {
    const user = await User.findOne({ _id: id });
    if (user) {
      user.set({ is_blocked: true });
      return await user.save();
    }
    throw new NotFoundError('User not found');
  }

  //function to block a user
  async unblockUser(id: string): Promise<IUser> {
    const user = await User.findOne({ _id: id });
    if (user) {
      user.set({ is_blocked: false });
      return await user.save();
    }
    throw new NotFoundError('User not found');
  }
}
