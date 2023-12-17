import bcrypt from 'bcrypt';

import { BadRequestError } from '../common/errors/badRequestError';
import { IUser } from '../common/types/user';
import { UserRepository } from '../repositories/userRepository';
import { NotFoundError } from '../common/errors/notFoundError';
import { IBooking } from '../common/types/booking';
import { IUserService } from './interfaces/userService.interface';
import {
  PassTime,
  mailVerificationEmail,
  passToken,
  sendOtpVerificationEmail,
} from '../utilities/mail';
// functions to interact with database,handle errors if any
export class UserService implements IUserService {
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

  async getUserByEmail(email: string): Promise<IUser[]> {
    const document = await this.userRepository.getUserByEmail(email);
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

  //store token
  async resetPassMail(email: string): Promise<void> {
    const token = passToken();
    const time = new Date(PassTime());
    await sendOtpVerificationEmail(email, token);
    await this.userRepository.storeToken(email, token, time);
  }

  //token
  async verificationMail(email: string): Promise<void> {
    const token = passToken();
    const time = new Date(PassTime());
    await mailVerificationEmail(email, token);
    await this.userRepository.storeToken(email, token, time);
  }

  //check if token is valid
  async checkToken(token: string, time: Date): Promise<IUser | null> {
    return await this.userRepository.checkToken(token, time);
  }

  //reset user password
  async resetPass(token: string, password: string): Promise<void> {
    const newPass = await bcrypt.hash(password, 10);
    await this.userRepository.newPassword(token, newPass);
  }

  //verifyUser
  async verifyUser(token: string): Promise<void> {
    await this.userRepository.verifyUser(token);
  }
}
