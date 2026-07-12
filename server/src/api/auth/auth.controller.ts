import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import * as signature from 'cookie-signature';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      dateOfBirth: string;
    },
    @Req() req: Request,
  ) {
    const user = await this.auth.signUp(body);
    req.session.userId = user.id;
    return { ...user, _sid: this.signSession(req) };
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const user = await this.auth.signIn(body.email, body.password);
    req.session.userId = user.id;
    return { ...user, _sid: this.signSession(req) };
  }

  @Post('sign-out')
  @HttpCode(200)
  signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.session.destroy(() => {});
    res.clearCookie('connect.sid');
    return { ok: true };
  }

  @Get('me')
  async me(@Req() req: Request) {
    const userId = req.session.userId;
    if (!userId) throw new UnauthorizedException();
    const user = await this.auth.findById(userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  @Delete('account')
  @HttpCode(200)
  async deleteAccount(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.session.userId;
    if (!userId) throw new UnauthorizedException();
    await this.auth.deleteAccount(userId);
    req.session.destroy(() => {});
    res.clearCookie('connect.sid');
    return { ok: true };
  }

  private signSession(req: Request): string {
    const secret = process.env.SESSION_SECRET ?? 'angama-secret';
    return 's:' + signature.sign(req.sessionID, secret);
  }
}
