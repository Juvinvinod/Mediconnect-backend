import { BadRequestError } from '../common/errors/badRequestError';
import { IUser } from '../common/types/user';
import { UserRepository } from '../repositories/userRepository';
import { NotFoundError } from '../common/errors/notFoundError';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
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
}
