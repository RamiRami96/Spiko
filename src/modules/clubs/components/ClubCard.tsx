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
      className="bg-white rounded-3xl p-4 gap-3 active:opacity-80"
      style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}
    >
      <View className="flex-row items-start justify-between gap-2">
        <Text className="text-gray-900 font-semibold text-base flex-1" numberOfLines={1}>
          {club.name}
        </Text>
        <View className={`px-2 py-0.5 rounded-full ${status.bg}`}>
          <Text className={`text-xs font-medium ${status.text}`}>{status.label}</Text>
        </View>
      </View>

      <Text className="text-gray-500 text-sm leading-5" numberOfLines={2}>
        {club.description}
      </Text>

      <View className="flex-row gap-4">
        <View className="flex-row items-center gap-1">
          <Ionicons name="calendar-outline" size={13} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs">{formatDate(club.startDate)}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Ionicons name="location-outline" size={13} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs" numberOfLines={1}>{club.location}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between pt-1 border-t border-gray-50">
        <Text className="text-gray-400 text-xs">
          {club.currentMemberCount}/{club.maxMembers} members
        </Text>
        <Text className="text-gray-400 text-xs">Host: {club.host.name}</Text>
      </View>
    </Pressable>
  );
}
