import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { Row } from "./components/Row";

import { User } from "@/shared/models/user.model";


export type SettingsProps = {
  user: User | null;
  isLoading: boolean;
  onSignOut: () => void;
  onDeleteAccount: () => void;
};

export function Settings({ user, isLoading, onSignOut, onDeleteAccount }: SettingsProps) {
  return (
    <View className="flex-1 bg-background">
      <View className="bg-white px-4 pt-12 pb-6 items-center gap-3">
        <View className="w-20 h-20 rounded-full bg-primary items-center justify-center">
          <Text className="text-white text-3xl font-bold">
            {user?.name?.[0]?.toUpperCase() || ""}
          </Text>
        </View>
        <View className="items-center gap-0.5">
          <Text className="text-xl font-bold text-gray-900">{user?.name ?? "—"}</Text>
          <Text className="text-gray-400 text-sm">{user?.email ?? "—"}</Text>
        </View>
      </View>

      <View className="mx-4 mt-4 bg-white rounded-3xl px-4">
        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-4 pb-1">
          Account
        </Text>
        <Row icon="person-outline" label="Full Name" value={user?.name} />
        <Row icon="mail-outline" label="Email" value={user?.email} />
        <Row icon="calendar-outline" label="Date of Birth" value={user?.dateOfBirth} />
      </View>

      <View className="mx-4 mt-4 gap-3">
        <Pressable
          onPress={onSignOut}
          disabled={isLoading}
          className="flex-row items-center justify-center gap-2 bg-white rounded-2xl py-4 active:opacity-70"
        >
          <Ionicons name="log-out-outline" size={20} color="#4F46E5" />
          <Text className="text-primary font-semibold text-base">Sign Out</Text>
        </Pressable>

        <Pressable
          onPress={onDeleteAccount}
          disabled={isLoading}
          className="flex-row items-center justify-center gap-2 bg-red-50 rounded-2xl py-4 active:opacity-70"
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text className="text-red-500 font-semibold text-base">Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
}
