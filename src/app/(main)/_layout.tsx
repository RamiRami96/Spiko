import { Tabs } from "expo-router";

import { BottomNav } from "@/shared/components";

export default function MainLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="clubs" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
