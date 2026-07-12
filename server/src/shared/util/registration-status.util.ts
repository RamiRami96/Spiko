import { RegistrationStatus } from '../../../generated/prisma/enums';
import { STATUS_MAP } from '../const/registration-status.const';
import { PublicRegistrationStatus } from '../type/registration-status.type';

export function mapRegistrationStatus(
  status: RegistrationStatus,
): PublicRegistrationStatus {
  return STATUS_MAP[status];
}
