import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map(({ dataValues }) => dataValues);
  }

  async findByProgress(inProgress: string): Promise<IMatch[]> {
    const boolValue = inProgress === 'true';
    const dbData = await this.model.findAll({
      where: { inProgress: boolValue },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map(({ dataValues }) => dataValues);
  }

  async update(id: number, data: Partial<IMatch>): Promise<boolean | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (!affectedRows) return null;
    return true;
  }

  async create(match: Omit<IMatch, 'id'>): Promise<IMatch> {
    const dbData = await this.model.create(match);
    return dbData.dataValues;
  }
}
