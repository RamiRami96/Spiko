import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Application } from "@/shared/const/applications.store";
import { User } from "@/shared/models/user.model";

import { AccountInfo } from "./components/AccountInfo";
import { ApplicantsList } from "./components/ApplicantsList";
import { UserApplicationsList } from "./components/UserApplicationsList";

export type SettingsProps = {
  user: User | null;
  isLoading: boolean;
  isHost: boolean;
  hostedClubName?: string;
  applicants: Application[];
  userApplications: Application[];
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
  onRefreshApplications: () => void;
  onSignOut: () => void;
  onDeleteAccount: () => void;
  top: number;
};

export function Settings({
  user,
  isLoading,
  isHost,
  hostedClubName,
  applicants,
  userApplications,
  onAccept,
  onReject,
  onRefreshApplications,
  onSignOut,
  onDeleteAccount,
  top,
}: SettingsProps) {

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ paddingTop: top + 16, paddingHorizontal: 16, paddingBottom: 24, alignItems: "center", gap: 12 }}>
        <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center">
          <Text className="text-white text-3xl font-bold">
            {user?.name?.[0]?.toUpperCase() || ""}
          </Text>
        </View>
        <View className="items-center gap-0.5">
          <Text className="text-white text-xl font-bold">{user?.name ?? "—"}</Text>
          <Text className="text-white/70 text-sm">{user?.email ?? "—"}</Text>
        </View>
      </View>

      <AccountInfo user={user} />

      {userApplications.length > 0 && (
        <UserApplicationsList
          userApplications={userApplications}
          onRefresh={onRefreshApplications}
        />
      )}

      {isHost && (
        <ApplicantsList
          applicants={applicants}
          hostedClubName={hostedClubName}
          onAccept={onAccept}
          onReject={onReject}
        />
      )}

      <View className="mx-4 mb-8 gap-3">
        <Pressable
          onPress={onSignOut}
          disabled={isLoading}
          className="flex-row items-center justify-center gap-2 bg-white/20 rounded-2xl py-4 active:opacity-70"
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text className="text-white font-semibold text-base">Sign Out</Text>
        </Pressable>

        <Pressable
          onPress={onDeleteAccount}
          disabled={isLoading}
          className="flex-row items-center justify-center gap-2 bg-red-500/30 rounded-2xl py-4 active:opacity-70"
        >
          <Ionicons name="trash-outline" size={20} color="#FCA5A5" />
          <Text className="text-red-200 font-semibold text-base">Delete Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
