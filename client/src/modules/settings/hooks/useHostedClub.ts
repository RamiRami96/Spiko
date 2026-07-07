import { useEffect, useState } from "react";

import { User } from "@/shared/models/user.model";
import { clubsService } from "@/shared/services";
import { useClubsState } from "@/state/clubs/clubs.context";
import { Club } from "@/shared/models/club.model";

export function useHostedClub(user: User | null) {
  const clubs = useClubsState();
  const [hostedClub, setHostedClub] = useState<Club | null>(null);

  useEffect(() => {
    if (!user) { setHostedClub(null); return; }

    const fromState = clubs.find((c) => c.host.id === user.id);
    if (fromState) { setHostedClub(fromState); return; }

    // If clubs list is not yet loaded, fetch from API
    clubsService.getAll().then((all) => {
      setHostedClub(all.find((c) => c.host.id === user.id) ?? null);
    });
  }, [user?.id, clubs]);

  return hostedClub;
}
