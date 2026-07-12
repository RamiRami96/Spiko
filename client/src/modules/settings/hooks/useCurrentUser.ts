import { useCurrentUserQuery } from "@/shared/queries/auth.queries";

export function useCurrentUser() {
  const { data } = useCurrentUserQuery();
  return data ?? null;
}
