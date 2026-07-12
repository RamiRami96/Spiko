import { Club } from "@/shared/models/club.model";
import { User } from "@/shared/models/user.model";
import {
  useAcceptApplicantMutation,
  useApplicantsQuery,
  useMyApplicationsQuery,
  useRejectApplicantMutation,
} from "@/shared/queries/applications.queries";
import { Application } from "@/shared/models/application.model";

export function useApplicants(hostedClub: Club | null, user: User | null) {
  const applicantsQuery = useApplicantsQuery(hostedClub?.id);
  const myApplicationsQuery = useMyApplicationsQuery(!!user);
  const acceptMutation = useAcceptApplicantMutation();
  const rejectMutation = useRejectApplicantMutation();

  const applicants: Application[] = (applicantsQuery.data ?? []).map((a) => ({
    userId: a.userId,
    userName: a.user.name,
    clubId: a.clubId,
    clubName: hostedClub?.name ?? "",
    status: a.status,
  }));

  const userApplications: Application[] = user
    ? (myApplicationsQuery.data ?? []).map((a) => ({
        userId: user.id,
        userName: user.name,
        clubId: a.clubId,
        clubName: a.clubName,
        status: a.status,
      }))
    : [];

  const handleAccept = async (userId: string) => {
    if (!hostedClub) return;
    await acceptMutation.mutateAsync({ clubId: hostedClub.id, userId });
  };

  const handleReject = async (userId: string) => {
    if (!hostedClub) return;
    await rejectMutation.mutateAsync({ clubId: hostedClub.id, userId });
  };

  const handleRefreshApplications = async () => {
    await Promise.all([applicantsQuery.refetch(), myApplicationsQuery.refetch()]);
  };

  return { applicants, userApplications, handleAccept, handleReject, handleRefreshApplications };
}
