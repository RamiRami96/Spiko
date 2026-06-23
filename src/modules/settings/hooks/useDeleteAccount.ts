import { router } from "expo-router";
import { useState } from "react";

import { authService } from "@/shared/services";

export function useDeleteAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);

  const handleDeleteAccount = () => setDeleteAccountVisible(true);

  const confirmDeleteAccount = async () => {
    setDeleteAccountVisible(false);
    setIsLoading(true);
    await authService.deleteAccount();
    router.replace("/");
  };

  return {
    isLoading,
    deleteAccountVisible,
    handleDeleteAccount,
    confirmDeleteAccount,
    onDeleteClose: () => setDeleteAccountVisible(false),
  };
}
