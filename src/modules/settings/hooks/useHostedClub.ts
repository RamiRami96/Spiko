import { useMemo } from "react";

import { User } from "@/shared/models/user.model";
import { useClubsState } from "@/state/clubs/clubs.context";

export function useHostedClub(user: User | null) {
  const clubs = useClubsState();
  return useMemo(
    () => clubs.find((c) => c.host.id === user?.id) ?? null,
    [clubs, user]
  );
}
