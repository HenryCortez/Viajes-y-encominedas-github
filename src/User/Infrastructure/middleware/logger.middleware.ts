import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const user = req.body;
    if (user && user.password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(user.password, salt);
      user.passwordHash = passwordHash;
      user.passwordSalt = salt;
    }
    next();
  }
}
