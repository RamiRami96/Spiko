import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  name: string;
  onAccept: () => void;
  onReject: () => void;
};

export function ApplicantRow({ name, onAccept, onReject }: Props) {
  return (
    <View className="flex-row items-center gap-3 py-3 border-b border-white/10">
      <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
        <Text className="text-white text-sm font-bold">{name[0].toUpperCase()}</Text>
      </View>
      <Text className="text-white text-sm font-medium flex-1">{name}</Text>
      <Pressable
        onPress={onAccept}
        className="w-8 h-8 rounded-full bg-cyan-500/30 items-center justify-center active:opacity-60"
      >
        <Ionicons name="checkmark" size={16} color="#67E8F9" />
      </Pressable>
      <Pressable
        onPress={onReject}
        className="w-8 h-8 rounded-full bg-red-500/20 items-center justify-center active:opacity-60"
      >
        <Ionicons name="close" size={16} color="#FCA5A5" />
      </Pressable>
    </View>
  );
}
