import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { ClubsModule } from './api/clubs/clubs.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ClubsModule,
    UsersModule,
  ],
})
export class AppModule {}
