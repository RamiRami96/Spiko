import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Application, ApplicationStatus } from "@/shared/const/applications.store";
import { User } from "@/shared/models/user.model";

import { ApplicantRow } from "./components/ApplicantRow";
import { Row } from "./components/Row";

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
};

const STATUS_STYLE: Record<ApplicationStatus, { label: string; bg: string; text: string }> = {
  waiting:  { label: "Waiting",  bg: "bg-yellow-500/20", text: "text-yellow-300" },
  approved: { label: "Approved", bg: "bg-emerald-500/20", text: "text-emerald-300" },
  rejected: { label: "Rejected", bg: "bg-red-500/20",    text: "text-red-300" },
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
}: SettingsProps) {
  const { top } = useSafeAreaInsets();

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

      <View className="mx-4 mb-4 bg-white/15 rounded-3xl px-4">
        <Text className="text-xs font-semibold text-white/60 uppercase tracking-widest pt-4 pb-1">
          Account
        </Text>
        <Row icon="person-outline" label="Full Name" value={user?.name} />
        <Row icon="mail-outline" label="Email" value={user?.email} />
        <Row icon="calendar-outline" label="Date of Birth" value={user?.dateOfBirth} />
      </View>

      {userApplications.length > 0 && (
        <View className="mx-4 mb-4 bg-white/15 rounded-3xl px-4">
          <View className="flex-row items-center justify-between pt-4 pb-1">
            <Text className="text-xs font-semibold text-white/60 uppercase tracking-widest">
              My Applications
            </Text>
            <Pressable onPress={onRefreshApplications} className="active:opacity-60 p-1">
              <Ionicons name="refresh-outline" size={16} color="rgba(255,255,255,0.6)" />
            </Pressable>
          </View>
          {userApplications.map((app) => {
            const s = STATUS_STYLE[app.status];
            return (
              <View
                key={app.clubId}
                className="flex-row items-center py-3 border-b border-white/10"
              >
                <Text className="text-white text-sm font-medium flex-1">{app.clubName}</Text>
                <View className={`px-2.5 py-1 rounded-full ${s.bg}`}>
                  <Text className={`text-xs font-semibold ${s.text}`}>{s.label}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {isHost && (
        <View className="mx-4 mb-4 bg-white/15 rounded-3xl px-4">
          <Text className="text-xs font-semibold text-white/60 uppercase tracking-widest pt-4 pb-1">
            {hostedClubName ? `Applications — ${hostedClubName}` : "Applications"}
          </Text>
          {applicants.length === 0 ? (
            <View className="py-4">
              <Text className="text-white/40 text-sm text-center">No pending applications</Text>
            </View>
          ) : (
            applicants.map((a) => (
              <ApplicantRow
                key={a.userId}
                name={a.userName}
                onAccept={() => onAccept(a.userId)}
                onReject={() => onReject(a.userId)}
              />
            ))
          )}
        </View>
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
