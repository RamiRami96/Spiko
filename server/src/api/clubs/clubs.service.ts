import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegistrationStatus } from '../../../generated/prisma/enums';
import { mapRegistrationStatus } from '../../shared/util/registration-status.util';
import { toHttpException } from '../../shared/util/http-exception.util';
import { PrismaService } from '../../prisma/prisma.service';

type ClubRow = Awaited<ReturnType<ClubsService['findRaw']>>[number];

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId?: string) {
    try {
      const rows = await this.findRaw();
      return rows.map((r) => this.format(r, userId));
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async getOne(id: string, userId?: string) {
    try {
      const row = await this.findRaw(id);
      if (!row[0]) throw new NotFoundException('Club not found');
      return this.format(row[0], userId);
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async create(
    userId: string,
    data: {
      name: string;
      description: string;
      location: string;
      startDate: string;
      maxMembers: number;
    },
  ) {
    try {
      const startDate = new Date(data.startDate);
      const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
      const club = await this.prisma.club.create({
        data: {
          name: data.name,
          description: data.description,
          location: data.location,
          startDate,
          endDate,
          maxMembers: data.maxMembers,
          hostId: userId,
        },
        include: {
          host: { select: { id: true, name: true, avatarUrl: true } },
          registrations: true,
        },
      });
      return this.format(club, userId);
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async remove(clubId: string, userId: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: { id: clubId },
      });
      if (!club) throw new NotFoundException('Club not found');
      if (club.hostId !== userId) throw new ForbiddenException();
      await this.prisma.club.delete({ where: { id: clubId } });
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async apply(clubId: string, userId: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: { id: clubId },
        include: {
          registrations: { where: { status: RegistrationStatus.APPROVED } },
        },
      });
      if (!club) throw new NotFoundException('Club not found');

      const existing = await this.prisma.registration.findUnique({
        where: { userId_clubId: { userId, clubId } },
      });
      if (existing) return existing;

      return await this.prisma.registration.create({
        data: {
          userId,
          clubId,
          role: 'LISTENER',
          status: RegistrationStatus.PENDING,
        },
      });
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async getApplicants(clubId: string, hostId: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: { id: clubId },
      });
      if (!club) throw new NotFoundException('Club not found');
      if (club.hostId !== hostId) throw new ForbiddenException();

      const applicants = await this.prisma.registration.findMany({
        where: { clubId, status: RegistrationStatus.PENDING },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } },
        },
      });
      return applicants.map((a) => ({
        ...a,
        status: mapRegistrationStatus(a.status),
      }));
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async acceptApplicant(clubId: string, applicantId: string, hostId: string) {
    try {
      await this.assertHost(clubId, hostId);
      return await this.prisma.registration.update({
        where: { userId_clubId: { userId: applicantId, clubId } },
        data: { status: RegistrationStatus.APPROVED },
      });
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async rejectApplicant(clubId: string, applicantId: string, hostId: string) {
    try {
      await this.assertHost(clubId, hostId);
      return await this.prisma.registration.update({
        where: { userId_clubId: { userId: applicantId, clubId } },
        data: { status: RegistrationStatus.REJECTED },
      });
    } catch (err) {
      throw toHttpException(err);
    }
  }

  private async assertHost(clubId: string, userId: string) {
    const club = await this.prisma.club.findUnique({ where: { id: clubId } });
    if (!club) throw new NotFoundException('Club not found');
    if (club.hostId !== userId) throw new ForbiddenException();
  }

  private findRaw(id?: string) {
    const where = id ? { id } : {};
    return this.prisma.club.findMany({
      where,
      include: {
        host: { select: { id: true, name: true, avatarUrl: true } },
        registrations: {
          where: {
            status: {
              in: [RegistrationStatus.APPROVED, RegistrationStatus.PENDING],
            },
          },
          select: { userId: true, status: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private format(club: ClubRow, userId?: string) {
    const currentMemberCount = club.registrations.filter(
      (r) => r.status === RegistrationStatus.APPROVED,
    ).length;
    const isFull = currentMemberCount >= club.maxMembers;
    const rawStatus = club.status.toLowerCase() as
      'active' | 'cancelled' | 'full';
    const status = isFull && rawStatus === 'active' ? 'full' : rawStatus;

    return {
      id: club.id,
      name: club.name,
      description: club.description,
      location: club.location,
      maxMembers: club.maxMembers,
      currentMemberCount,
      status,
      startDate: club.startDate.toISOString(),
      endDate: (club.endDate ?? club.startDate).toISOString(),
      createdAt: club.createdAt.toISOString(),
      host: {
        id: club.host.id,
        name: club.host.name,
        ...(club.host.avatarUrl ? { avatarUrl: club.host.avatarUrl } : {}),
      },
      isRegistered: userId
        ? club.registrations.some((r) => r.userId === userId)
        : false,
    };
  }
}
