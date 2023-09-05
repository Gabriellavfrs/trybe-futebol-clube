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

  public async updateProgress(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateMatch(Number(id), { inProgress: false });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateGoals(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchService.updateMatch(Number(id), req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response):Promise<Response> {
    const { status, data } = await this.matchService.createMatch(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
