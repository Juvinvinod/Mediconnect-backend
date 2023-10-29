import { User, UserDoc } from '../models/userModel';

export class UserRepository {
  async createUser(userDetails: UserDoc): Promise<UserDoc> {
    const user = User.build(userDetails);
    return await user.save();
  }
}
