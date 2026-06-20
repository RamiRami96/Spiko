import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Route, TABS } from "@/shared/models/navigation.model";

type BottomNavProps = {
  state: { routes: Route[]; index: number };
  navigation: { navigate: (name: string) => void };
};

export function BottomNav({ state, navigation }: BottomNavProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="flex-row bg-white border-t border-gray-100"
      style={{ paddingBottom: bottom || 12 }}
    >
      {state.routes.map((route, index) => {
        const tab = TABS.find((t) => t.name === route.name);
        const isActive = state.index === index;

        if (!tab) return null;

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            className="flex-1 items-center pt-3 pb-1 gap-1 active:opacity-70"
          >
            <Ionicons
              name={isActive ? tab.iconActive : tab.icon}
              size={24}
              color={isActive ? "#4F46E5" : "#9CA3AF"}
            />
            <Text className={`text-xs font-medium ${isActive ? "text-primary" : "text-gray-400"}`}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
