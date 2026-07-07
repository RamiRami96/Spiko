import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCurrentUser } from "@/modules/settings/hooks/useCurrentUser";
import { clubsService } from "@/shared/services";
import { STATUS_STYLES } from "@/shared/const/status-styles";
import { useClubsDispatch, useClubsState } from "@/state/clubs/clubs.context";

const APPLY_LABELS: Record<string, string> = {
  full: "Club is Full",
  cancelled: "Cancelled",
};

export function useClubDetail(id: string, onBack: () => void) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const insets = useSafeAreaInsets();
  const clubs = useClubsState();
  const dispatch = useClubsDispatch();
  const [successVisible, setSuccessVisible] = useState(false);
  const [warnVisible, setWarnVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const club = clubs.find((c) => c.id === id);

  const isHost = currentUser?.id === club?.host.id;
  const canApply = club ? !club.isRegistered && club.status === "active" : false;
  const status = club ? STATUS_STYLES[club.status] : undefined;
  const membersRatio = club ? club.currentMemberCount / club.maxMembers : 0;
  const spotsLeft = club ? club.maxMembers - club.currentMemberCount : 0;
  const applyLabel = club?.isRegistered
    ? "Already Registered"
    : (APPLY_LABELS[club?.status ?? ""] ?? "Apply to Join");

  const handleApply = async () => {
    if (!club) return;
    await clubsService.apply(club.id);
    dispatch({ type: "MARK_REGISTERED", clubId: club.id });
    router.replace("/(main)/clubs");
  };

  const handleApplyPress = () => {
    if (club?.isRegistered) {
      setWarnVisible(true);
    } else {
      setSuccessVisible(true);
    }
  };

  const handleConfirm = () => {
    setSuccessVisible(false);
    void handleApply();
  };

  const handleDelete = async () => {
    if (!club) return;
    setDeleteVisible(false);
    await clubsService.remove(club.id);
    dispatch({ type: "REMOVE", clubId: club.id });
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
    onDelete: () => void handleDelete(),
    onWarnClose: () => setWarnVisible(false),
    onDeleteOpen: () => setDeleteVisible(true),
    onDeleteClose: () => setDeleteVisible(false),
  };
}
