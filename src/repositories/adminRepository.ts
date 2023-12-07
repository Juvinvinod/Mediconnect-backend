import { User } from '../models/userModel';
import { IUser } from '../common/types/user';
import { NotFoundError } from '../common/errors/notFoundError';
import { IDept } from '../common/types/department';
import { Department } from '../models/departmentModel';
import { Doctor } from '../models/doctorModel';
import { Staff } from '../models/staffModel';
import { IAdminRepository } from './interfaces/adminRepository.interface';
import { BadRequestError } from '../common/errors/badRequestError';

export class AdminRepository implements IAdminRepository {
  //function to block a user
  async blockUser(id: string): Promise<IUser> {
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        user.set({ is_blocked: true });
        return await user.save();
      }
      throw new NotFoundError('User not found');
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //function to block a user
  async unblockUser(id: string): Promise<IUser> {
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        user.set({ is_blocked: false });
        return await user.save();
      }
      throw new NotFoundError('User not found');
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //create department
  async createDept(name: IDept): Promise<IDept | null> {
    try {
      const dept = Department.build(name);
      return await dept.save();
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //get department
  async getDept(): Promise<IDept[] | null> {
    try {
      return await Department.find({});
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //get user count
  async userCount(): Promise<number> {
    try {
      return await User.find({ role: 'user' }).count();
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //get doctor count
  async docCount(): Promise<number> {
    try {
      return await Doctor.find({}).count();
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //get staff count
  async staffCount(): Promise<number> {
    try {
      return await Staff.find({}).count();
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }

  //update department name
  async updateDept(_id: string, dept: string): Promise<IDept | null> {
    try {
      return await Department.findByIdAndUpdate(
        { _id: _id },
        { dept_name: dept }
      );
    } catch (error) {
      throw new BadRequestError('Database Error');
    }
  }
}
