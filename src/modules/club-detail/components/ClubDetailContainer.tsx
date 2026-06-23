import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { clubsStore } from "@/state/clubs.state";
import { useCurrentUser } from "@/modules/settings/hooks/useCurrentUser";
import { applicationsStore } from "@/shared/const/applications.store";

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
  const { successVisible, setSuccessVisible, warnVisible, setWarnVisible, deleteVisible, setDeleteVisible } = useClubDetailModals();

  const club = clubsStore.getAll().find((c) => c.id === id);
  if (!club) return null;

  const { isHost, alreadyApplied } = useClubUserRelation(club, currentUser);
  const { status, canApply, applyLabel } = useClubStatus(club);
  const { membersRatio, spotsLeft } = useClubMembers(club);

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
      onDelete={handleDelete}
      onWarnClose={() => setWarnVisible(false)}
      onDeleteOpen={() => setDeleteVisible(true)}
      onDeleteClose={() => setDeleteVisible(false)}
    />
  );
}
