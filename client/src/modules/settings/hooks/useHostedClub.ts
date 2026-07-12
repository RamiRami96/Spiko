import { User } from "@/shared/models/user.model";
import { useHostedClubQuery } from "@/shared/queries/users.queries";

export function useHostedClub(user: User | null) {
  return useHostedClubQuery(user?.id);
}
