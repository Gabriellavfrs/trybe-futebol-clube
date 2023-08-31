import { IUserModel } from '../Interfaces/users/IUserModel';
import { IUser } from '../Interfaces/users/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }
}
