import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { applicationsService } from "@/shared/services";

import { queryKeys } from "./query-keys";

export function useApplicantsQuery(clubId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.clubs.applicants(clubId ?? ""),
    queryFn: () => applicationsService.getApplicants(clubId as string),
    enabled: !!clubId,
  });
}

export function useMyApplicationsQuery(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.users.myApplications,
    queryFn: applicationsService.getMyApplications,
    enabled,
  });
}

export function useAcceptApplicantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clubId, userId }: { clubId: string; userId: string }) =>
      applicationsService.accept(clubId, userId),
    onSuccess: (_data, { clubId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs.applicants(clubId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs.all });
    },
  });
}

export function useRejectApplicantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ clubId, userId }: { clubId: string; userId: string }) =>
      applicationsService.reject(clubId, userId),
    onSuccess: (_data, { clubId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs.applicants(clubId) });
    },
  });
}
