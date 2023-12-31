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

  public async updateMatch(id: number, data: Partial<IMatch>): Promise<ServiceResponse<IMatch>> {
    const updatedMatch = await this.matchModel.update(id, data);
    if (!updatedMatch) {
      return { status: 'CONFLICT', data: { message: 'match has not been updated' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createMatch(match: Omit<IMatch, 'id'>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = match;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROC_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const homeTeam = await this.matchModel.findById(homeTeamId);
    const awayTeam = await this.matchModel.findById(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatch = await this.matchModel.create(match);
    return { status: 'CREATED', data: newMatch };
  }
}
