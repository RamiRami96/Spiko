import { Club } from "@/shared/models/club.model";
import { User } from "@/shared/models/user.model";
import { applicationsStore } from "@/shared/const/applications.store";

export function useClubUserRelation(club: Club, currentUser: User | null) {
  const isHost = currentUser?.id === club.host.id;
  const alreadyApplied = currentUser
    ? applicationsStore.hasApplied(currentUser.id, club.id)
    : false;

  return { isHost, alreadyApplied };
}
