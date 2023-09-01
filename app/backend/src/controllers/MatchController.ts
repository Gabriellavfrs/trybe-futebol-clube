import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getMatches(req: Request, res: Response):Promise<Response> {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, data } = await this.matchService.getAllMatches();
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.getByProgress(inProgress as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
