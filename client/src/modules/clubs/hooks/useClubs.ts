import { useEffect } from "react";

import { useClubsDispatch, useClubsState } from "@/state/clubs/clubs.context";

export function useClubs() {
  const clubs = useClubsState();
  const dispatch = useClubsDispatch();

  useEffect(() => {
    dispatch({ type: "PURGE_EXPIRED" });
  }, []);

  return clubs;
}
