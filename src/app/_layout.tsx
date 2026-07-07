import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

import { authService } from "@/shared/services";
import { ApplicationsProvider } from "@/state/applications/applications.context";
import { ClubsProvider } from "@/state/clubs/clubs.context";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) router.replace("/(main)/clubs");
      })
      .finally(() => {
        SplashScreen.hideAsync().catch(() => {});
      });
  }, []);

  return (
    <ClubsProvider>
      <ApplicationsProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ApplicationsProvider>
    </ClubsProvider>
  );
}
