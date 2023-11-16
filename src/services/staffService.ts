import { BadRequestError } from '../common/errors/badRequestError';
import { NotFoundError } from '../common/errors/notFoundError';
import { IStaff } from '../common/types/staff';
import { StaffRepository } from '../repositories/staffRepository';

// functions to interact with database,handle errors if any
export class StaffService {
  private staffRepository: StaffRepository;

  constructor() {
    this.staffRepository = new StaffRepository();
  }

  async signup(staffDetails: IStaff): Promise<IStaff> {
    const existingStaff = await this.staffRepository.findStaffByEmail(
      staffDetails.email
    );
    if (existingStaff) {
      throw new BadRequestError('User already exists');
    } else {
      return await this.staffRepository.createStaff(staffDetails);
    }
  }

  async login(email: string): Promise<IStaff> {
    const staff = await this.staffRepository.findStaffByEmail(email);
    if (!staff) {
      throw new NotFoundError('Email not found');
    } else {
      return staff;
    }
  }

  async getStaff(id: string): Promise<IStaff[]> {
    const document = await this.staffRepository.getStaff(id);
    if (!document) {
      throw new NotFoundError('No staffs found');
    } else {
      return document;
    }
  }

  async getStaffs(): Promise<IStaff[]> {
    const documents = await this.staffRepository.getStaffs();
    if (!documents) {
      throw new NotFoundError('No staffs found');
    } else {
      return documents;
    }
  }

  // update staff details with given data
  async UpdateStaff(id: string, staff: IStaff): Promise<IStaff | null> {
    return await this.staffRepository.updateStaff(id, staff);
  }

  //block a staff
  async blockStaff(id: string): Promise<IStaff | null> {
    return await this.staffRepository.blockStaff(id);
  }

  //unblock a doctor
  async unblockStaff(id: string): Promise<IStaff | null> {
    return await this.staffRepository.unblockStaff(id);
  }

  //update password
  async updatePassword(id: string, newPass: string): Promise<IStaff | null> {
    return await this.staffRepository.passwordChange(id, newPass);
  }
}
