import { QueryTypes } from 'sequelize';
// import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import db from '../database/models';
import homeLeaderboardQuery from '../utils/MySQLQueries';

export default class LeaderboardModel {
  private model = db;
  private homeQuery = homeLeaderboardQuery;

  async findAllhomeLeaderboard() {
    const dbData = await this.model.query(this.homeQuery, { type: QueryTypes.SELECT });
    return dbData;
  }
}
