import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  findAllhomeLeaderboard() :Promise<ILeaderboard[]>;
}
