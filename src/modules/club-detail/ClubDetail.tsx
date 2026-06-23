import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { clubsStore } from "@/modules/clubs/clubs.store";
import { useCurrentUser } from "@/modules/settings/hooks/useCurrentUser";
import { applicationsStore } from "@/shared/const/applications.store";
import { ConfirmModal, GradientButton } from "@/shared/components";
import { formatDate, formatTime } from "@/shared/utils/date.utils";

import { STATUS_STYLES } from "@/shared/const/status-styles";

type Props = {
  id: string;
  onBack: () => void;
};


export function ClubDetail({ id, onBack }: Props) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const { top, bottom } = useSafeAreaInsets();
  const [successVisible, setSuccessVisible] = useState(false);
  const [warnVisible, setWarnVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const club = clubsStore.getAll().find((c) => c.id === id);
  if (!club) return null;

  const isHost = currentUser?.id === club.host.id;
  const alreadyApplied = currentUser
    ? applicationsStore.hasApplied(currentUser.id, club.id)
    : false;
  const status = STATUS_STYLES[club.status];
  const canApply = !club.isRegistered && club.status === "active";
  const membersRatio = club.currentMemberCount / club.maxMembers;
  const spotsLeft = club.maxMembers - club.currentMemberCount;

  const APPLY_LABELS: Record<string, string> = {
    full: "Club is Full",
    cancelled: "Cancelled",
  };
  const applyLabel = club.isRegistered
    ? "Already Registered"
    : (APPLY_LABELS[club.status] ?? "Apply to Join");

  const handleApply = () => {
    if (currentUser) {
      applicationsStore.apply({
        userId: currentUser.id,
        userName: currentUser.name,
        clubId: club.id,
        clubName: club.name,
      });
    }
    clubsStore.incrementMemberCount(club.id);
    router.replace("/(main)/clubs");
  };

  const handleApplyPress = () => {
    if (alreadyApplied) {
      setWarnVisible(true);
    } else {
      setSuccessVisible(true);
    }
  };

  const handleConfirm = () => {
    setSuccessVisible(false);
    handleApply();
  };

  const handleDelete = () => {
    setDeleteVisible(false);
    clubsStore.remove(club.id);
    router.replace("/(main)/clubs");
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

        {!isHost && (
          <View style={{ paddingTop: 4 }}>
            {canApply ? (
              <GradientButton label={applyLabel} onPress={handleApplyPress} />
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
              onPress={() => setDeleteVisible(true)}
              className="h-14 rounded-full bg-red-500/20 flex-row items-center justify-center gap-2 active:opacity-70"
            >
              <Ionicons name="trash-outline" size={18} color="#F87171" />
              <Text className="text-red-400 font-semibold text-base">Delete Club</Text>
            </Pressable>
          </View>
        )}
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

      <ConfirmModal
        visible={deleteVisible}
        title="Delete Club?"
        description={
          <Text className="text-white/60 text-sm text-center leading-5">
            This will permanently remove{"\n"}
            <Text className="text-white font-semibold">{club.name}</Text>
            {"\n"}and cannot be undone.
          </Text>
        }
        confirmLabel="Yes, Delete"
        icon={{ name: "trash-outline", color: "#F87171", bgClass: "bg-red-500/20" }}
        onConfirm={handleDelete}
        onCancel={() => setDeleteVisible(false)}
      />

      <Modal visible={warnVisible} transparent animationType="fade">
        <View
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <View className="bg-black/60 rounded-3xl p-6 w-full gap-5" style={{ borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" }}>
            <View className="items-center gap-4">
              <View className="w-16 h-16 rounded-full bg-amber-500/20 items-center justify-center">
                <Ionicons name="warning" size={40} color="#F59E0B" />
              </View>
              <View className="items-center gap-1.5">
                <Text className="text-white font-bold text-xl text-center">
                  Already Applied
                </Text>
                <Text className="text-white/60 text-sm text-center leading-5">
                  You have already submitted an application to{"\n"}
                  <Text className="text-white font-semibold">{club.name}</Text>
                  {"\n"}Please wait for the host to respond.
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => setWarnVisible(false)}
              className="h-14 rounded-full bg-amber-500/20 items-center justify-center active:opacity-70"
            >
              <Text className="text-amber-300 font-semibold text-base">OK, Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
