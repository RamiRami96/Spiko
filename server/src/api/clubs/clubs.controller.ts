import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  constructor(private clubs: ClubsService) {}

  @Get()
  getAll(@Req() req: Request) {
    return this.clubs.getAll(this.userId(req));
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Req() req: Request) {
    return this.clubs.getOne(id, this.userId(req));
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      description: string;
      location: string;
      startDate: string;
      maxMembers: number;
    },
    @Req() req: Request,
  ) {
    return this.clubs.create(this.requireUser(req), body);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.clubs.remove(id, this.requireUser(req));
  }

  @Post(':id/apply')
  @HttpCode(200)
  apply(@Param('id') clubId: string, @Req() req: Request) {
    return this.clubs.apply(clubId, this.requireUser(req));
  }

  @Get(':id/applicants')
  getApplicants(@Param('id') clubId: string, @Req() req: Request) {
    return this.clubs.getApplicants(clubId, this.requireUser(req));
  }

  @Patch(':id/applicants/:userId/accept')
  @HttpCode(200)
  accept(
    @Param('id') clubId: string,
    @Param('userId') applicantId: string,
    @Req() req: Request,
  ) {
    return this.clubs.acceptApplicant(
      clubId,
      applicantId,
      this.requireUser(req),
    );
  }

  @Patch(':id/applicants/:userId/reject')
  @HttpCode(200)
  reject(
    @Param('id') clubId: string,
    @Param('userId') applicantId: string,
    @Req() req: Request,
  ) {
    return this.clubs.rejectApplicant(
      clubId,
      applicantId,
      this.requireUser(req),
    );
  }

  private userId(req: Request): string | undefined {
    return req.session.userId;
  }

  private requireUser(req: Request): string {
    const id = this.userId(req);
    if (!id) throw new UnauthorizedException();
    return id;
  }
}
