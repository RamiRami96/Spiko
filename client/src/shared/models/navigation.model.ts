import { Ionicons } from "@expo/vector-icons";

export type Route = {
  key: string;
  name: string;
};

export type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
};

export const TABS: TabConfig[] = [
  { name: "clubs", label: "Clubs", icon: "mic-outline", iconActive: "mic" },
  { name: "settings", label: "Profile", icon: "person-outline", iconActive: "person" },
];
