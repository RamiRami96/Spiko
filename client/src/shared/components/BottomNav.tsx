import { Ionicons } from "@expo/vector-icons";
import { GlassView } from "expo-glass-effect";
import { Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Route, TABS } from "@/shared/models/navigation.model";

type BottomNavProps = {
  state: { routes: Route[]; index: number };
  navigation: { navigate: (name: string) => void };
};

export function BottomNav({ state, navigation }: BottomNavProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <GlassView
      glassEffectStyle='clear'
      style={{
        flexDirection: "row",
        paddingBottom: bottom,
      }}
    >
      {state.routes.map((route, index) => {
        const tab = TABS.find((t) => t.name === route.name);
        const isActive = state.index === index;

        if (!tab) return null;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: "center", paddingTop: 12, paddingBottom: 4, gap: 4 }}
          >
            <Ionicons
              name={isActive ? tab.iconActive : tab.icon}
              size={24}
              color={isActive ? "#fff" : "rgba(255,255,255,0.5)"}
            />
            <Text style={{ fontSize: 12, fontWeight: "500", color: isActive ? "#fff" : "rgba(255,255,255,0.5)" }}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </GlassView>
  );
}
