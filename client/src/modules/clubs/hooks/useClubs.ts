import { useClubsQuery } from "@/shared/queries/clubs.queries";

export function useClubs() {
  const { data, isRefetching, refetch } = useClubsQuery();

  const clubs = (data ?? []).filter((c) => new Date(c.startDate) > new Date());

  return { clubs, isRefetching, refetch };
}
