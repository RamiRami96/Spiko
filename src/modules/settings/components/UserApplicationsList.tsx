import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { Application } from "@/shared/const/applications.store";

import { ApplicationRow } from "./ApplicationRow";

type Props = {
  userApplications: Application[];
  onRefresh: () => void;
};

export function UserApplicationsList({ userApplications, onRefresh }: Props) {
  return (
    <View className="mx-4 mb-4 bg-white/15 rounded-3xl px-4">
      <View className="flex-row items-center justify-between pt-4 pb-1">
        <Text className="text-xs font-semibold text-white/60 uppercase tracking-widest">
          My Applications
        </Text>
        <Pressable onPress={onRefresh} className="active:opacity-60 p-1">
          <Ionicons name="refresh-outline" size={16} color="rgba(255,255,255,0.6)" />
        </Pressable>
      </View>
      {userApplications.map((app) => (
        <ApplicationRow key={app.clubId} app={app} />
      ))}
    </View>
  );
}
