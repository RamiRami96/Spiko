import { router } from "expo-router";
import { useState } from "react";

import { authService } from "@/shared/services";

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await authService.signOut();
    router.replace("/");
  };

  return { isLoading, handleSignOut };
}
