import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamConroller {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getAllBooks(req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status;
  }
}
