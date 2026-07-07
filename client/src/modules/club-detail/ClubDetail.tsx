import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import { GradientButton } from "@/shared/components";
import { formatDate, formatTime } from "@/shared/utils/date.utils";
import type { Club } from "@/shared/models/club.model";

import { AlreadyAppliedModal } from "./components/AlreadyAppliedModal";
import { ApplySuccessModal } from "./components/ApplySuccessModal";
import { DeleteClubModal } from "./components/DeleteClubModal";

type Props = {
  club: Club;
  insets: EdgeInsets;
  isHost: boolean;
  status: { bg: string; text: string; label: string };
  canApply: boolean;
  membersRatio: number;
  spotsLeft: number;
  applyLabel: string;
  successVisible: boolean;
  warnVisible: boolean;
  deleteVisible: boolean;
  onBack: () => void;
  onApplyPress: () => void;
  onConfirm: () => void;
  onDelete: () => void;
  onWarnClose: () => void;
  onDeleteOpen: () => void;
  onDeleteClose: () => void;
};

export function ClubDetail({
  club,
  insets,
  isHost,
  status,
  canApply,
  membersRatio,
  spotsLeft,
  applyLabel,
  successVisible,
  warnVisible,
  deleteVisible,
  onBack,
  onApplyPress,
  onConfirm,
  onDelete,
  onWarnClose,
  onDeleteOpen,
  onDeleteClose,
}: Props) {
  return (
    <LinearGradient
      colors={["#06B6D4", "#4F46E5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 16,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={onBack}
          className="flex-row items-center gap-2 active:opacity-70 self-start"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text className="text-white font-medium text-base">Back</Text>
        </Pressable>

        <View style={{ gap: 6 }}>
          <View className="flex-row items-start gap-3">
            <Text className="text-white font-bold text-3xl flex-1">{club.name}</Text>
            <View className={`px-3 py-1 rounded-full mt-1 ${status.bg}`}>
              <Text className={`text-xs font-semibold ${status.text}`}>{status.label}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="person-outline" size={14} color="rgba(255,255,255,0.6)" />
            <Text className="text-white/60 text-sm">Hosted by {club.host.name}</Text>
          </View>
        </View>

        <View className="bg-black/30 rounded-3xl p-4 gap-4">
          <View style={{ gap: 6 }}>
            <Text className="text-white/60 text-xs font-semibold uppercase tracking-widest">
              About
            </Text>
            <Text className="text-white text-sm leading-6">{club.description}</Text>
          </View>

          <View className="border-t border-white/10" />

          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-xl bg-white/10 items-center justify-center">
              <Ionicons name="calendar-outline" size={17} color="#fff" />
            </View>
            <View style={{ gap: 2 }}>
              <Text className="text-white font-medium text-sm">{formatDate(club.startDate)}</Text>
              <Text className="text-white/60 text-xs">
                {formatTime(club.startDate)} – {formatTime(club.endDate)}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 rounded-xl bg-white/10 items-center justify-center">
              <Ionicons name="location-outline" size={17} color="#fff" />
            </View>
            <View style={{ gap: 2 }}>
              <Text className="text-white font-medium text-sm">{club.location}</Text>
              <Text className="text-white/60 text-xs">In-person event</Text>
            </View>
          </View>

          <View className="border-t border-white/10" />

          <View style={{ gap: 8 }}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="people-outline" size={16} color="rgba(255,255,255,0.6)" />
                <Text className="text-white/60 text-sm">Members</Text>
              </View>
              <Text className="text-white font-semibold text-sm">
                {club.currentMemberCount}/{club.maxMembers}
              </Text>
            </View>
            <View className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <View
                className="h-full bg-white/50 rounded-full"
                style={{ width: `${Math.round(membersRatio * 100)}%` }}
              />
            </View>
            <Text className="text-white/50 text-xs">
              {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "No spots remaining"}
            </Text>
          </View>
        </View>

        {!isHost && (
          <View style={{ paddingTop: 4 }}>
            {canApply ? (
              <GradientButton label={applyLabel} onPress={onApplyPress} />
            ) : (
              <View className="h-14 rounded-full bg-white/15 items-center justify-center">
                <Text className="text-white/50 font-semibold text-base">{applyLabel}</Text>
              </View>
            )}
          </View>
        )}

        {isHost && (
          <View style={{ paddingTop: 4 }}>
            <Pressable
              onPress={onDeleteOpen}
              className="h-14 rounded-full bg-red-500/20 flex-row items-center justify-center gap-2 active:opacity-70"
            >
              <Ionicons name="trash-outline" size={18} color="#F87171" />
              <Text className="text-red-400 font-semibold text-base">Delete Club</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <ApplySuccessModal
        visible={successVisible}
        clubName={club.name}
        onConfirm={onConfirm}
      />

      <DeleteClubModal
        visible={deleteVisible}
        clubName={club.name}
        onConfirm={onDelete}
        onCancel={onDeleteClose}
      />

      <AlreadyAppliedModal
        visible={warnVisible}
        clubName={club.name}
        onClose={onWarnClose}
      />
    </LinearGradient>
  );
}
