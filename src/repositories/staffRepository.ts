import { NotFoundError } from '../common/errors/notFoundError';
import { IStaff } from '../common/types/staff';
import { Staff } from '../models/staffModel';

export class StaffRepository {
  // create a new staff and save it in database
  async createStaff(staffDetails: IStaff): Promise<IStaff> {
    const staff = Staff.build(staffDetails);
    return await staff.save();
  }

  //check for the user document in the database
  async findStaffByEmail(email: string): Promise<IStaff | null> {
    return await Staff.findOne({ email });
  }

  //function to get  staff documents
  async getStaff(id: string): Promise<IStaff[] | null> {
    return await Staff.find({ _id: id });
  }

  //function to get all staff documents
  async getStaffs(): Promise<IStaff[] | null> {
    return await Staff.find({ role: 'staff' });
  }

  //update staff details
  async updateStaff(id: string, staffDetails: IStaff): Promise<IStaff | null> {
    return await Staff.findByIdAndUpdate({ _id: id }, staffDetails);
  }

  //function to block a staff
  async blockStaff(id: string): Promise<IStaff> {
    const staff = await Staff.findOne({ _id: id });
    if (staff) {
      staff.set({ is_blocked: true });
      return await staff.save();
    }
    throw new NotFoundError('Staff not found');
  }

  //function to block a staff
  async unblockStaff(id: string): Promise<IStaff> {
    const staff = await Staff.findOne({ _id: id });
    if (staff) {
      staff.set({ is_blocked: false });
      return await staff.save();
    }
    throw new NotFoundError('User not found');
  }

  //function to update password doctor
  async passwordChange(id: string, newPass: string): Promise<IStaff> {
    const staff = await Staff.findOne({ _id: id });
    if (staff) {
      staff.set({ password: newPass });
      return await staff.save();
    }
    throw new NotFoundError('Staff not found');
  }
}
