import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Club } from "@/shared/models/club.model";
import { clubsService, CreateClubData } from "@/shared/services/clubs.service";

import { queryKeys } from "./query-keys";

export function useClubsQuery() {
  return useQuery({
    queryKey: queryKeys.clubs.all,
    queryFn: clubsService.getAll,
  });
}

export function useClubQuery(id: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: queryKeys.clubs.detail(id),
    queryFn: () => clubsService.getOne(id),
    enabled: !!id,
    initialData: () =>
      queryClient
        .getQueryData<Club[]>(queryKeys.clubs.all)
        ?.find((c) => c.id === id),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(queryKeys.clubs.all)?.dataUpdatedAt,
  });
}

export function useCreateClubMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateClubData) => clubsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs.all });
    },
  });
}

export function useDeleteClubMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => clubsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs.all });
      queryClient.removeQueries({ queryKey: queryKeys.clubs.detail(id) });
    },
  });
}

export function useApplyToClubMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clubId: string) => clubsService.apply(clubId),
    onSuccess: (_data, clubId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.clubs.detail(clubId) });
    },
  });
}
