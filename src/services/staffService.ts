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

  async getStaffs(): Promise<IStaff[]> {
    const documents = await this.staffRepository.getStaffs();
    if (!documents) {
      throw new NotFoundError('No staffs found');
    } else {
      return documents;
    }
  }
}
