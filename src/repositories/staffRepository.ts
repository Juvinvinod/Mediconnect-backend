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

  //function to get all staff documents
  async getStaffs(): Promise<IStaff[] | null> {
    return await Staff.find({ role: 'staff' });
  }
}
