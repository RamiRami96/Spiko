import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { User } from "@/shared/models/user.model";

import { ApplicantRow } from "./components/ApplicantRow";
import { Row } from "./components/Row";
import { Applicant } from "./const/mock-applicants.const";

export type SettingsProps = {
  user: User | null;
  isLoading: boolean;
  isHost: boolean;
  hostedClubName?: string;
  applicants: Applicant[];
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
  onSignOut: () => void;
  onDeleteAccount: () => void;
};

export function Settings({ user, isLoading, isHost, hostedClubName, applicants, onAccept, onReject, onSignOut, onDeleteAccount }: SettingsProps) {
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
                  key={a.id}
                  name={a.name}
                  onAccept={() => onAccept(a.id)}
                  onReject={() => onReject(a.id)}
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
