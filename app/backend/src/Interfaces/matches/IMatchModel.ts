import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByProgress(inProgress: string): Promise<IMatch[]>;
  findById(id:number): Promise<IMatch | null>;
  update(id:number, data: Partial<IMatch>): Promise<boolean | null>;
  create(match: Omit<IMatch, 'id'>): Promise<IMatch>;
}
