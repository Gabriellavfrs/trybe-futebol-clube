import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getByProgress(inProgress: string) {
    const matches = await this.matchModel.findByProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateProgress(id: number): Promise<ServiceResponse<IMatch>> {
    const updatedMatch = await this.matchModel.update(id, { inProgress: false });
    if (!updatedMatch) {
      return { status: 'CONFLICT', data: { message: 'match has not been updated' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
