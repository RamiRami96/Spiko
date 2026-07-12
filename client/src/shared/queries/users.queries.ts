import { useQuery } from "@tanstack/react-query";

import { usersService } from "@/shared/services";

import { useClubQuery } from "./clubs.queries";
import { queryKeys } from "./query-keys";

export function useHostedClubQuery(userId: string | undefined) {
  const hostedClubRefQuery = useQuery({
    queryKey: queryKeys.users.hostedClub,
    queryFn: usersService.getHostedClub,
    enabled: !!userId,
  });

  const clubQuery = useClubQuery(hostedClubRefQuery.data?.id ?? "");

  return hostedClubRefQuery.data ? (clubQuery.data ?? null) : null;
}
