import { useMemo } from "react";

import { Club } from "@/shared/models/club.model";
import { User } from "@/shared/models/user.model";
import { useApplicationsDispatch, useApplicationsState } from "@/state/applications/applications.context";

export function useApplicants(hostedClub: Club | null, user: User | null) {
  const applications = useApplicationsState();
  const dispatch = useApplicationsDispatch();

  const applicants = useMemo(
    () => hostedClub
      ? applications.filter((a) => a.clubId === hostedClub.id && a.status === "waiting")
      : [],
    [applications, hostedClub]
  );

  const userApplications = useMemo(
    () => user ? applications.filter((a) => a.userId === user.id) : [],
    [applications, user]
  );

  const handleAccept = (userId: string) => {
    if (!hostedClub) return;
    dispatch({ type: "ACCEPT", userId, clubId: hostedClub.id });
  };

  const handleReject = (userId: string) => {
    if (!hostedClub) return;
    dispatch({ type: "REJECT", userId, clubId: hostedClub.id });
  };

  const handleRefreshApplications = async () => {
    await new Promise((r) => setTimeout(r, 500));
  };

  return { applicants, userApplications, handleAccept, handleReject, handleRefreshApplications };
}
