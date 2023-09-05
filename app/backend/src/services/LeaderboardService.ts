import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) {}

  public async getHomeLeaderboard() {
    const homeLeaderboard = await this.leaderboardModel.findAllhomeLeaderboard();
    return { status: 'SUCCESSFUL', data: homeLeaderboard };
  }
}
