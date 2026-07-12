import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { toHttpException } from '../../shared/util/http-exception.util';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(data: {
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
  }) {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing) throw new ConflictException('Email already registered');

      const hashed = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashed,
          dateOfBirth: new Date(data.dateOfBirth),
        },
      });

      return this.strip(user);
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new UnauthorizedException('Invalid email or password');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new UnauthorizedException('Invalid email or password');

      return this.strip(user);
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async findById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) return null;
      return this.strip(user);
    } catch (err) {
      throw toHttpException(err);
    }
  }

  async deleteAccount(userId: string) {
    try {
      await this.prisma.user.delete({ where: { id: userId } });
    } catch (err) {
      throw toHttpException(err);
    }
  }

  private strip(user: {
    id: string;
    name: string;
    email: string;
    dateOfBirth: Date;
    avatarUrl: string | null;
    createdAt: Date;
    password: string;
  }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      dateOfBirth: user.dateOfBirth.toISOString().split('T')[0],
      createdAt: user.createdAt.toISOString(),
    };
  }
}
