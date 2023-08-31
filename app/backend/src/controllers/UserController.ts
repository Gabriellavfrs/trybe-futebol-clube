import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { data, status } = await this.userService.login(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async userRole(req: Request, res: Response) {
    const { payload } = req.body;
    const { data, status } = await this.userService.getUserRole(payload.email);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
