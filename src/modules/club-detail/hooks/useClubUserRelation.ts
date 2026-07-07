import { Club } from "@/shared/models/club.model";
import { User } from "@/shared/models/user.model";
import { useApplicationsState } from "@/state/applications/applications.context";

export function useClubUserRelation(club: Club, currentUser: User | null) {
  const applications = useApplicationsState();

  const isHost = currentUser?.id === club.host.id;
  const alreadyApplied = currentUser
    ? applications.some((a) => a.userId === currentUser.id && a.clubId === club.id)
    : false;

  return { isHost, alreadyApplied };
}
