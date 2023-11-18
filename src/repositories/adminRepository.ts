import { User } from '../models/userModel';
import { IUser } from '../common/types/user';
import { NotFoundError } from '../common/errors/notFoundError';
import { IDept } from '../common/types/department';
import { Department } from '../models/departmentModel';

export class AdminRepository {
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

  //create department
  async createDept(name: IDept): Promise<IDept | null> {
    const dept = Department.build(name);
    return await dept.save();
  }
}
