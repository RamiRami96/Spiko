import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function toHttpException(err: unknown): HttpException {
  if (err instanceof HttpException) return err;
  const message = err instanceof Error ? err.message : 'Unexpected error';
  return new InternalServerErrorException(message);
}
