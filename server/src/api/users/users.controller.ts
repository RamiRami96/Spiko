import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Patch('me')
  @HttpCode(200)
  updateProfile(
    @Body() body: { name?: string; avatarUrl?: string },
    @Req() req: Request,
  ) {
    return this.users.updateProfile(this.requireUser(req), body);
  }

  @Get('me/applications')
  getMyApplications(@Req() req: Request) {
    return this.users.getMyApplications(this.requireUser(req));
  }

  @Get('me/hosted-club')
  getMyHostedClub(@Req() req: Request) {
    return this.users.getMyHostedClub(this.requireUser(req));
  }

  private requireUser(req: Request): string {
    const id = req.session.userId;
    if (!id) throw new UnauthorizedException();
    return id;
  }
}
