import { BadRequestError } from '../common/errors/badRequestError';
import { IUser } from '../common/types/user';
import { UserRepository } from '../repositories/userRepository';

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
}
