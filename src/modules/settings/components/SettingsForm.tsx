import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { clubsStore } from "@/state/clubs.state";
import { ConfirmModal } from "@/shared/components";
import { authService } from "@/shared/services";
import { Application, applicationsStore } from "@/shared/const/applications.store";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { Settings } from "../Settings";

export function SettingsForm() {
  const { top } = useSafeAreaInsets();
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [userApplications, setUserApplications] = useState<Application[]>([]);

  const hostedClub = useMemo(
    () => clubsStore.getAll().find((c) => c.host.id === user?.id),
    [user]
  );

  useEffect(() => {
    setApplicants(
      hostedClub
        ? applicationsStore.getByClubId(hostedClub.id).filter((a) => a.status === "waiting")
        : []
    );
  }, [hostedClub]);

  useEffect(() => {
    if (user) setUserApplications(applicationsStore.getByUserId(user.id));
  }, [user]);

  useEffect(() => {
    const unsub = applicationsStore.subscribe(() => {
      if (hostedClub) {
        setApplicants(
          applicationsStore.getByClubId(hostedClub.id).filter((a) => a.status === "waiting")
        );
      }
      if (user) setUserApplications(applicationsStore.getByUserId(user.id));
    });
    return () => { unsub(); };
  }, [hostedClub, user]);

  const handleAccept = (userId: string) => {
    if (!hostedClub) return;
    applicationsStore.accept(userId, hostedClub.id);
  };

  const handleReject = (userId: string) => {
    if (!hostedClub) return;
    applicationsStore.reject(userId, hostedClub.id);
  };

  const handleRefreshApplications = async () => {
    await new Promise((r) => setTimeout(r, 500));
    if (user) setUserApplications(applicationsStore.getByUserId(user.id));
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await authService.signOut();
    router.replace("/");
  };

  const handleDeleteAccount = () => setDeleteAccountVisible(true);

  const confirmDeleteAccount = async () => {
    setDeleteAccountVisible(false);
    setIsLoading(true);
    await authService.deleteAccount();
    router.replace("/");
  };

  return (
    <>
      <Settings
        user={user}
        isLoading={isLoading}
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
        onCancel={() => setDeleteAccountVisible(false)}
      />
    </>
  );
}
