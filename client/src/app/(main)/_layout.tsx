import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";

import { BottomNav } from "@/shared/components";

export default function MainLayout() {
  return (
    <LinearGradient
      colors={["#06B6D4", "#4F46E5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Tabs
        tabBar={(props) => <BottomNav {...props} />}
        screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: "transparent" } }}
      >
        <Tabs.Screen name="clubs" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </LinearGradient>
  );
}
