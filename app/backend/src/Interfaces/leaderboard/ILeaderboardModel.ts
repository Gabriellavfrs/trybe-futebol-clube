import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  findAllhomeLeaderboard() :Promise<ILeaderboard[]>;
  findAllAwayLeaderboard() : Promise<ILeaderboard[]>;
  findAllTeamsLeaderboard() : Promise<ILeaderboard[]>;
}
