import { BadRequestError } from '../common/errors/badRequestError';
import { IUser } from '../common/types/user';
import { UserRepository } from '../repositories/userRepository';
import { NotFoundError } from '../common/errors/notFoundError';
import { IBooking } from '../common/types/booking';

// functions to interact with database,handle errors if any
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(userDetails: IUser): Promise<IUser> {
    const existingUser = await this.userRepository.findUserByEmail(
      userDetails.email
    );
    if (existingUser) {
      throw new BadRequestError('User already exists');
    } else {
      return await this.userRepository.createUser(userDetails);
    }
  }

  async login(email: string): Promise<IUser> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError('Email not found');
    } else {
      return user;
    }
  }

  async getUser(id: string): Promise<IUser[]> {
    const document = await this.userRepository.getUser(id);
    if (!document) {
      throw new NotFoundError('No users found');
    } else {
      return document;
    }
  }

  async getUsers(): Promise<IUser[]> {
    const documents = await this.userRepository.getUsers();
    if (!documents) {
      throw new NotFoundError('No users found');
    } else {
      return documents;
    }
  }

  async getStaffs(): Promise<IUser[]> {
    const documents = await this.userRepository.getStaffs();
    if (!documents) {
      throw new NotFoundError('No staffs found');
    } else {
      return documents;
    }
  }

  //update password
  async updatePassword(id: string, newPass: string): Promise<IUser | null> {
    return await this.userRepository.passwordChange(id, newPass);
  }

  //get all booking documents
  async getSLots(): Promise<IBooking[] | null> {
    return await this.userRepository.getSlots();
  }
}
