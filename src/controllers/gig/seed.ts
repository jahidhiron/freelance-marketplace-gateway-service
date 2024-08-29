import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { gigService } from '@gateway/services/api/gig.service';

export class GigSeed {
  public async gig(req: Request, res: Response): Promise<void> {
    const response = await gigService.seed(req.params.count);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
