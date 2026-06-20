import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
};

export function Row({ icon, label, value }: Props) {
  return (
    <View className="flex-row items-center gap-3 py-3 border-b border-gray-50">
      <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center">
        <Ionicons name={icon} size={16} color="#4F46E5" />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-gray-400">{label}</Text>
        <Text className="text-sm text-gray-800 font-medium mt-0.5">{value ?? "—"}</Text>
      </View>
    </View>
  );
}
