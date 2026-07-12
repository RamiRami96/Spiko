import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use((req: Request, _res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth?.startsWith('Bearer ')) {
      req.headers.cookie = `connect.sid=${encodeURIComponent(auth.slice(7))}`;
    }
    next();
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'angama-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
