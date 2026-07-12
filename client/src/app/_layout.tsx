import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { authService } from "@/shared/services";
import { queryKeys } from "@/shared/queries/query-keys";

SplashScreen.preventAutoHideAsync().catch(() => {});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    queryClient
      .fetchQuery({
        queryKey: queryKeys.auth.me,
        queryFn: authService.getCurrentUser,
      })
      .then((user) => {
        if (user) router.replace("/(main)/clubs");
      })
      .finally(() => {
        SplashScreen.hideAsync().catch(() => {});
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
