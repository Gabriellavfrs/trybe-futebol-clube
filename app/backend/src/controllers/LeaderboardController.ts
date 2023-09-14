import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getHomeLeaderboard(req: Request, res: Response):Promise<Response> {
    const { status, data } = await this.leaderboardService.getHomeLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAwayLeaderboard(req: Request, res: Response) :Promise<Response> {
    const { status, data } = await this.leaderboardService.getAwayLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllLeaderboard(req: Request, res: Response) :Promise<Response> {
    const { status, data } = await this.leaderboardService.getAllLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
