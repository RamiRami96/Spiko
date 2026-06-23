import { useMemo } from "react";

import { clubsStore } from "@/state/clubs.state";
import { User } from "@/shared/models/user.model";

export function useHostedClub(user: User | null) {
  return useMemo(
    () => clubsStore.getAll().find((c) => c.host.id === user?.id) ?? null,
    [user]
  );
}
