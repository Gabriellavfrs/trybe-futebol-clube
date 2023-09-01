import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getMatches(req: Request, res: Response):Promise<Response> {
    const { inProgress } = req.query;
    console.log(typeof inProgress);
    if (!inProgress) {
      const { status, data } = await this.matchService.getAllMatches();
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.getByProgress(inProgress as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
