import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { clubsStore } from "@/state/clubs.state";
import { useCurrentUser } from "@/modules/settings/hooks/useCurrentUser";
import { applicationsStore } from "@/shared/const/applications.store";
import { STATUS_STYLES } from "@/shared/const/status-styles";

const APPLY_LABELS: Record<string, string> = {
  full: "Club is Full",
  cancelled: "Cancelled",
};

export function useClubDetail(id: string, onBack: () => void) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const insets = useSafeAreaInsets();
  const [successVisible, setSuccessVisible] = useState(false);
  const [warnVisible, setWarnVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const club = clubsStore.getAll().find((c) => c.id === id);

  const isHost = currentUser?.id === club?.host.id;
  const alreadyApplied = currentUser && club
    ? applicationsStore.hasApplied(currentUser.id, club.id)
    : false;
  const status = club ? STATUS_STYLES[club.status] : undefined;
  const canApply = club ? !club.isRegistered && club.status === "active" : false;
  const membersRatio = club ? club.currentMemberCount / club.maxMembers : 0;
  const spotsLeft = club ? club.maxMembers - club.currentMemberCount : 0;
  const applyLabel = club?.isRegistered
    ? "Already Registered"
    : (APPLY_LABELS[club?.status ?? ""] ?? "Apply to Join");

  const handleApply = () => {
    if (!club) return;
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
    if (!club) return;
    setDeleteVisible(false);
    clubsStore.remove(club.id);
    router.replace("/(main)/clubs");
  };

  return {
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
    onApplyPress: handleApplyPress,
    onConfirm: handleConfirm,
    onDelete: handleDelete,
    onWarnClose: () => setWarnVisible(false),
    onDeleteOpen: () => setDeleteVisible(true),
    onDeleteClose: () => setDeleteVisible(false),
  };
}
