import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCurrentUser } from "@/modules/settings/hooks/useCurrentUser";
import { useApplicationsDispatch } from "@/state/applications/applications.context";
import { useClubsDispatch, useClubsState } from "@/state/clubs/clubs.context";

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
  const clubs = useClubsState();
  const clubsDispatch = useClubsDispatch();
  const applicationsDispatch = useApplicationsDispatch();
  const { successVisible, setSuccessVisible, warnVisible, setWarnVisible, deleteVisible, setDeleteVisible } = useClubDetailModals();

  const club = clubs.find((c) => c.id === id);
  if (!club) return null;

  const { isHost, alreadyApplied } = useClubUserRelation(club, currentUser);
  const { status, canApply, applyLabel } = useClubStatus(club);
  const { membersRatio, spotsLeft } = useClubMembers(club);

  const handleApply = () => {
    if (currentUser) {
      applicationsDispatch({
        type: "APPLY",
        entry: {
          userId: currentUser.id,
          userName: currentUser.name,
          clubId: club.id,
          clubName: club.name,
        },
      });
    }
    clubsDispatch({ type: "INCREMENT_MEMBER_COUNT", clubId: club.id });
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
    clubsDispatch({ type: "REMOVE", clubId: club.id });
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
