import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GradientButton } from "@/shared/components";
import { Club } from "@/shared/models/club.model";
import { formatDate } from "@/shared/utils/date.utils";

import { STATUS_STYLES } from "./const/status-styles";

type Props = {
  club: Club;
  onApply: () => void;
  onBack: () => void;
};

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function ClubDetail({ club, onApply, onBack }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const [successVisible, setSuccessVisible] = useState(false);
  const status = STATUS_STYLES[club.status];
  const canApply = !club.isRegistered && club.status === "active";
  const membersRatio = club.currentMemberCount / club.maxMembers;
  const spotsLeft = club.maxMembers - club.currentMemberCount;

  const applyLabel = club.isRegistered
    ? "Already Registered"
    : club.status === "full"
    ? "Club is Full"
    : club.status === "cancelled"
    ? "Cancelled"
    : "Apply to Join";

  const handleApplyPress = () => setSuccessVisible(true);

  const handleConfirm = () => {
    setSuccessVisible(false);
    onApply();
  };

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
          paddingTop: top + 16,
          paddingBottom: bottom + 24,
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

        <View style={{ paddingTop: 4 }}>
          {canApply ? (
            <GradientButton label={applyLabel} onPress={handleApplyPress} />
          ) : (
            <View className="h-14 rounded-full bg-white/15 items-center justify-center">
              <Text className="text-white/50 font-semibold text-base">{applyLabel}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal visible={successVisible} transparent animationType="fade">
        <View
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <View className="bg-black/60 rounded-3xl p-6 w-full gap-5" style={{ borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" }}>
            <View className="items-center gap-4">
              <View className="w-16 h-16 rounded-full bg-white/10 items-center justify-center">
                <Ionicons name="checkmark-circle" size={40} color="#06B6D4" />
              </View>
              <View className="items-center gap-1.5">
                <Text className="text-white font-bold text-xl text-center">
                  Application Sent!
                </Text>
                <Text className="text-white/60 text-sm text-center leading-5">
                  You have applied to join{"\n"}
                  <Text className="text-white font-semibold">{club.name}</Text>
                  {"\n"}The host will review your request.
                </Text>
              </View>
            </View>

            <GradientButton label="Got it" onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
