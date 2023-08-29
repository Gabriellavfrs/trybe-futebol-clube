import ITeam from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    console.log(dbData);
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }
}
