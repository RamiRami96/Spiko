import { useEffect, useState } from "react";

import { Club } from "@/shared/models/club.model";

import { clubsStore } from "../clubs.store";

export function useClubs(): Club[] {
  const [clubs, setClubs] = useState(() => clubsStore.getAll());

  useEffect(() => {
    clubsStore.purgeExpired();
    return clubsStore.subscribe(() => setClubs(clubsStore.getAll()));
  }, []);

  return clubs;
}
