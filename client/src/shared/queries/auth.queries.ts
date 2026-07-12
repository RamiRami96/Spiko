import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authService } from "@/shared/services";

import { queryKeys } from "./query-keys";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.getCurrentUser,
  });
}

export function useSignInMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.signIn(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);
    },
  });
}

export function useSignUpMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.auth.me, user);
    },
  });
}

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.deleteAccount,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
