import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByProgress(inProgress: string): Promise<IMatch[]>;
  update(id:number, data: Partial<IMatch>): Promise<boolean | null>;
}
