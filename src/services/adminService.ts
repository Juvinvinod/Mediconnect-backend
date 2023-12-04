import { IDept } from '../common/types/department';
import { IUser } from '../common/types/user';
import { AdminRepository } from '../repositories/adminRepository';
import { UserRepository } from '../repositories/userRepository';
import { IAdminService } from './interfaces/adminService.interface';

// functions to interact with database,handle errors if any
export class AdminService implements IAdminService {
  private adminRepository: AdminRepository;
  private userRepository: UserRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
    this.userRepository = new UserRepository();
  }

  // update user details with given data
  async UpdateUser(id: string, user: IUser): Promise<IUser | null> {
    return await this.userRepository.updateUser(id, user);
  }

  //get a single user
  async getUser(id: string): Promise<IUser[] | null> {
    return await this.userRepository.getUser(id);
  }

  //block a user
  async blockUser(id: string): Promise<IUser | null> {
    return await this.adminRepository.blockUser(id);
  }

  //unblock a user
  async unblockUser(id: string): Promise<IUser | null> {
    return await this.adminRepository.unblockUser(id);
  }

  //create a department
  async createDept(name: IDept): Promise<IDept | null> {
    return await this.adminRepository.createDept(name);
  }

  //get all departments
  async getDept(): Promise<IDept[] | null> {
    return await this.adminRepository.getDept();
  }

  //update department name
  async updateDept(_id: string, dept: string) {
    return await this.adminRepository.updateDept(_id, dept);
  }

  //get count of documents
  async getCount(model: string) {
    if (model === 'doctor') {
      return await this.adminRepository.docCount();
    }
    if (model === 'user') {
      return await this.adminRepository.userCount();
    }
    if (model === 'staff') {
      return await this.adminRepository.staffCount();
    }
  }
}
