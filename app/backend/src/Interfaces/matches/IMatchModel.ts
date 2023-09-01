import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByProgress(inProgress: string): Promise<IMatch[]>;
}
