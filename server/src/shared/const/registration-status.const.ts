import { RegistrationStatus } from '../../../generated/prisma/enums';
import { PublicRegistrationStatus } from '../type/registration-status.type';

export const STATUS_MAP: Record<RegistrationStatus, PublicRegistrationStatus> = {
  PENDING: 'waiting',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  WAITLISTED: 'waiting',
  CANCELLED: 'cancelled',
};
