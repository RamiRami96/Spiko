import { router } from "expo-router";
import { useState } from "react";

import { authService } from "@/shared/services";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { Settings } from "../Settings";

export function SettingsForm() {
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await authService.signOut();
    router.replace("/");
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    await authService.deleteAccount();
    router.replace("/");
  };

  return (
    <Settings
      user={user}
      isLoading={isLoading}
      onSignOut={handleSignOut}
      onDeleteAccount={handleDeleteAccount}
    />
  );
}
