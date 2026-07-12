import { router } from "expo-router";

import { useSignOutMutation } from "@/shared/queries/auth.queries";

export function useSignOut() {
  const mutation = useSignOutMutation();

  const handleSignOut = async () => {
    await mutation.mutateAsync();
    router.replace("/");
  };

  return { isLoading: mutation.isPending, handleSignOut };
}
