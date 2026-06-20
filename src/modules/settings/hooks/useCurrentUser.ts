import { useEffect, useState } from "react";

import { User } from "@/shared/models/user.model";
import { authService } from "@/shared/services";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.getCurrentUser().then(setUser);
  }, []);

  return user;
}
