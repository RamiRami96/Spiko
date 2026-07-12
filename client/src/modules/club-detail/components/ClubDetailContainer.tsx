import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCurrentUser } from "@/modules/settings/hooks/useCurrentUser";
import { useApplyToClubMutation, useClubQuery, useDeleteClubMutation } from "@/shared/queries/clubs.queries";

import { ClubDetail } from "../ClubDetail";
import { useClubDetailModals } from "../hooks/useClubDetailModals";
import { useClubMembers } from "../hooks/useClubMembers";
import { useClubStatus } from "../hooks/useClubStatus";
import { useClubUserRelation } from "../hooks/useClubUserRelation";

type Props = {
  id: string;
  onBack: () => void;
};

export function ClubDetailContainer({ id, onBack }: Props) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const insets = useSafeAreaInsets();
  const { data: club } = useClubQuery(id);
  const applyMutation = useApplyToClubMutation();
  const deleteMutation = useDeleteClubMutation();
  const { successVisible, setSuccessVisible, warnVisible, setWarnVisible, deleteVisible, setDeleteVisible } = useClubDetailModals();

  if (!club) return null;

  const { isHost, alreadyApplied } = useClubUserRelation(club, currentUser);
  const { status, canApply, applyLabel } = useClubStatus(club);
  const { membersRatio, spotsLeft } = useClubMembers(club);

  const handleApply = async () => {
    await applyMutation.mutateAsync(club.id);
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
    void handleApply();
  };

  const handleDelete = async () => {
    setDeleteVisible(false);
    await deleteMutation.mutateAsync(club.id);
    router.replace("/(main)/clubs");
  };

  return (
    <ClubDetail
      club={club}
      insets={insets}
      isHost={isHost}
      status={status}
      canApply={canApply}
      membersRatio={membersRatio}
      spotsLeft={spotsLeft}
      applyLabel={applyLabel}
      successVisible={successVisible}
      warnVisible={warnVisible}
      deleteVisible={deleteVisible}
      onBack={onBack}
      onApplyPress={handleApplyPress}
      onConfirm={handleConfirm}
      onDelete={() => void handleDelete()}
      onWarnClose={() => setWarnVisible(false)}
      onDeleteOpen={() => setDeleteVisible(true)}
      onDeleteClose={() => setDeleteVisible(false)}
    />
  );
}
