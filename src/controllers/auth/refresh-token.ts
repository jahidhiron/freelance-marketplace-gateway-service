import { authService } from '@gateway/services/api/auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Refresh {
  public async token(req: Request, res: Response): Promise<void> {
    const response = await authService.getRefreshToken();
    req.session = { jwt: response.data.token };

    res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
  }
}
