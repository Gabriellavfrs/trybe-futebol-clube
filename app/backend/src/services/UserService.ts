import * as bcrypt from 'bcryptjs';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import Auth from '../utils/Auth';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(data: ILogin) :Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = Auth.JwtSign({ email: user.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getUserRole(email: string):Promise<ServiceResponse<{ role: string }>> {
    const { role } = await this.userModel.findByEmail(email) as IUser;
    if (!role) {
      return { status: 'NOT_FOUND', data: { message: 'Role not found' } };
    }
    return { status: 'SUCCESSFUL', data: { role } };
  }
}
