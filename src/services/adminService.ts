import { IUser } from '../common/types/user';
import { AdminRepository } from '../repositories/adminRepository';
import { UserRepository } from '../repositories/userRepository';

// functions to interact with database,handle errors if any
export class AdminService {
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
}
