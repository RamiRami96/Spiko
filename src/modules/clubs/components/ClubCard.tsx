import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Club } from "@/shared/models/club.model";
import { formatDate } from "@/shared/utils/date.utils";

import { STATUS_STYLES } from "../const/status-styles";

type Props = {
  club: Club;
  onPress?: () => void;
};

export function ClubCard({ club, onPress }: Props) {
  const status = STATUS_STYLES[club.status];

  return (
    <Pressable
      onPress={onPress}
      className="bg-black/30 rounded-3xl p-4 gap-3 active:opacity-70"
    >
      <View className="flex-row items-start justify-between gap-2">
        <Text className="text-white font-semibold text-base flex-1" numberOfLines={1}>
          {club.name}
        </Text>
        <View className={`px-2 py-0.5 rounded-full ${status.bg}`}>
          <Text className={`text-xs font-medium ${status.text}`}>{status.label}</Text>
        </View>
      </View>

      <Text className="text-white text-sm leading-5" numberOfLines={2}>
        {club.description}
      </Text>

      <View className="flex-row gap-4">
        <View className="flex-row items-center gap-1">
          <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.5)" />
          <Text className="text-white/50 text-xs">{formatDate(club.startDate)}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.5)" />
          <Text className="text-white/50 text-xs" numberOfLines={1}>{club.location}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-1 border-t border-white/10">
        <Text className="text-white/50 text-xs">
          {club.currentMemberCount}/{club.maxMembers} members
        </Text>
        <Text className="text-white/50 text-xs">Host: {club.host.name}</Text>
      </View>
    </Pressable>
  );
}
