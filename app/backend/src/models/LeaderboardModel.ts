import { QueryTypes } from 'sequelize';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import db from '../database/models';
import {
  allLeaderboardQuery,
  awayLeaderboardQuery,
  homeLeaderboardQuery,
} from '../utils/MySQLQueries';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardModel implements ILeaderboardModel {
  private model = db;
  private homeQuery = homeLeaderboardQuery;
  private awayQuery = awayLeaderboardQuery;
  private allQuery = allLeaderboardQuery;

  async findAllhomeLeaderboard(): Promise<ILeaderboard[]> {
    const dbData :ILeaderboard[] = await this.model
      .query(this.homeQuery, { type: QueryTypes.SELECT });
    return dbData;
  }

  async findAllAwayLeaderboard() : Promise<ILeaderboard[]> {
    const dbData :ILeaderboard[] = await this.model
      .query(this.awayQuery, { type: QueryTypes.SELECT });
    return dbData;
  }

  async findAllTeamsLeaderboard() : Promise<ILeaderboard[]> {
    const dbData :ILeaderboard[] = await this.model
      .query(this.allQuery, { type: QueryTypes.SELECT });
    return dbData;
  }
}
