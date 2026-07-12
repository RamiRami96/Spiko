import { router } from "expo-router";
import { useState } from "react";

import { useDeleteAccountMutation } from "@/shared/queries/auth.queries";

export function useDeleteAccount() {
  const mutation = useDeleteAccountMutation();
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);

  const handleDeleteAccount = () => setDeleteAccountVisible(true);

  const confirmDeleteAccount = async () => {
    setDeleteAccountVisible(false);
    await mutation.mutateAsync();
    router.replace("/");
  };

  return {
    isLoading: mutation.isPending,
    deleteAccountVisible,
    handleDeleteAccount,
    confirmDeleteAccount,
    onDeleteClose: () => setDeleteAccountVisible(false),
  };
}
