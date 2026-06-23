import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ConfirmModal } from "@/shared/components";

import { useApplicants } from "../hooks/useApplicants";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useHostedClub } from "../hooks/useHostedClub";
import { useSignOut } from "../hooks/useSignOut";
import { Settings } from "../Settings";

export function SettingsForm() {
  const { top } = useSafeAreaInsets();
  const user = useCurrentUser();
  const hostedClub = useHostedClub(user);
  const { applicants, userApplications, handleAccept, handleReject, handleRefreshApplications } = useApplicants(hostedClub, user);
  const { isLoading: signOutLoading, handleSignOut } = useSignOut();
  const { isLoading: deleteLoading, deleteAccountVisible, handleDeleteAccount, confirmDeleteAccount, onDeleteClose } = useDeleteAccount();

  return (
    <>
      <Settings
        user={user}
        isLoading={signOutLoading || deleteLoading}
        isHost={!!hostedClub}
        hostedClubName={hostedClub?.name}
        applicants={applicants}
        userApplications={userApplications}
        onAccept={handleAccept}
        onReject={handleReject}
        onRefreshApplications={handleRefreshApplications}
        onSignOut={handleSignOut}
        onDeleteAccount={handleDeleteAccount}
        top={top}
      />
      <ConfirmModal
        visible={deleteAccountVisible}
        title="Delete Account?"
        description={
          <Text className="text-white/60 text-sm text-center leading-5">
            This will permanently delete your account{"\n"}and all associated data.{"\n"}This cannot be undone.
          </Text>
        }
        confirmLabel="Yes, Delete"
        icon={{ name: "person-remove-outline", color: "#F87171", bgClass: "bg-red-500/20" }}
        onConfirm={confirmDeleteAccount}
        onCancel={onDeleteClose}
      />
    </>
  );
}
