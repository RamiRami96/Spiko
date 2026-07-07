import { useEffect, useState } from "react";

import { Club } from "@/shared/models/club.model";
import { User } from "@/shared/models/user.model";
import { applicationsService } from "@/shared/services/applications.service";
import { Application } from "@/state/applications/applications.reducer";
import { useClubsDispatch } from "@/state/clubs/clubs.context";

export function useApplicants(hostedClub: Club | null, user: User | null) {
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const clubsDispatch = useClubsDispatch();

  useEffect(() => {
    if (!hostedClub) return;
    applicationsService.getApplicants(hostedClub.id).then((data) => {
      setApplicants(
        data.map((a) => ({
          userId: a.userId,
          userName: a.user.name,
          clubId: a.clubId,
          clubName: hostedClub.name,
          status: a.status,
        }))
      );
    });
  }, [hostedClub?.id]);

  useEffect(() => {
    if (!user) return;
    applicationsService.getMyApplications().then((data) => {
      setUserApplications(
        data.map((a) => ({
          userId: user.id,
          userName: user.name,
          clubId: a.clubId,
          clubName: a.clubName,
          status: a.status,
        }))
      );
    });
  }, [user?.id]);

  const handleAccept = async (userId: string) => {
    if (!hostedClub) return;
    await applicationsService.accept(hostedClub.id, userId);
    setApplicants((prev) => prev.filter((a) => a.userId !== userId));
    clubsDispatch({ type: "INCREMENT_MEMBER_COUNT", clubId: hostedClub.id });
  };

  const handleReject = async (userId: string) => {
    if (!hostedClub) return;
    await applicationsService.reject(hostedClub.id, userId);
    setApplicants((prev) => prev.filter((a) => a.userId !== userId));
  };

  const handleRefreshApplications = async () => {
    if (hostedClub) {
      const data = await applicationsService.getApplicants(hostedClub.id);
      setApplicants(
        data.map((a) => ({
          userId: a.userId,
          userName: a.user.name,
          clubId: a.clubId,
          clubName: hostedClub.name,
          status: a.status,
        }))
      );
    }
    if (user) {
      const data = await applicationsService.getMyApplications();
      setUserApplications(
        data.map((a) => ({
          userId: user.id,
          userName: user.name,
          clubId: a.clubId,
          clubName: a.clubName,
          status: a.status,
        }))
      );
    }
  };

  return { applicants, userApplications, handleAccept, handleReject, handleRefreshApplications };
}
