import { Club } from "@/shared/models/club.model";
import { User } from "@/shared/models/user.model";

export function useClubUserRelation(club: Club, currentUser: User | null) {
  const isHost = currentUser?.id === club.host.id;
  const alreadyApplied = club.isRegistered;

  return { isHost, alreadyApplied };
}
