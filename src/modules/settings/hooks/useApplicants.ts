import { useEffect, useState } from "react";

import { Application, applicationsStore } from "@/shared/const/applications.store";
import { Club } from "@/shared/models/club.model";
import { User } from "@/shared/models/user.model";

export function useApplicants(hostedClub: Club | null, user: User | null) {
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [userApplications, setUserApplications] = useState<Application[]>([]);

  useEffect(() => {
    setApplicants(
      hostedClub
        ? applicationsStore.getByClubId(hostedClub.id).filter((a) => a.status === "waiting")
        : []
    );
  }, [hostedClub]);

  useEffect(() => {
    if (user) setUserApplications(applicationsStore.getByUserId(user.id));
  }, [user]);

  useEffect(() => {
    const unsub = applicationsStore.subscribe(() => {
      if (hostedClub) {
        setApplicants(
          applicationsStore.getByClubId(hostedClub.id).filter((a) => a.status === "waiting")
        );
      }
      if (user) setUserApplications(applicationsStore.getByUserId(user.id));
    });
    return () => { unsub(); };
  }, [hostedClub, user]);

  const handleAccept = (userId: string) => {
    if (!hostedClub) return;
    applicationsStore.accept(userId, hostedClub.id);
  };

  const handleReject = (userId: string) => {
    if (!hostedClub) return;
    applicationsStore.reject(userId, hostedClub.id);
  };

  const handleRefreshApplications = async () => {
    await new Promise((r) => setTimeout(r, 500));
    if (user) setUserApplications(applicationsStore.getByUserId(user.id));
  };

  return { applicants, userApplications, handleAccept, handleReject, handleRefreshApplications };
}
