import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) {}

  public async getHomeLeaderboard() :Promise<ServiceResponse<ILeaderboard[]>> {
    const homeLeaderboard = await this.leaderboardModel.findAllhomeLeaderboard();
    return { status: 'SUCCESSFUL', data: homeLeaderboard };
  }

  public async getAwayLeaderboard() :Promise<ServiceResponse<ILeaderboard[]>> {
    const awayLeaderboard = await this.leaderboardModel.findAllAwayLeaderboard();
    return { status: 'SUCCESSFUL', data: awayLeaderboard };
  }
}
