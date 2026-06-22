import { router } from "expo-router";
import { useState } from "react";

import { MOCK_CLUBS } from "@/modules/clubs/const/mock-clubs";
import { authService } from "@/shared/services";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { Settings } from "../Settings";
import { Applicant, mockApplicants } from "../const/mock-applicants.const";

export function SettingsForm() {
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const hostedClub = MOCK_CLUBS.find((c) => c.host.id === user?.id);
  const [applicants, setApplicants] = useState<Applicant[]>(() =>
    hostedClub ? mockApplicants.getByClubId(hostedClub.id) : []
  );

  const handleAccept = (userId: string) => {
    if (!hostedClub) return;
    mockApplicants.accept(hostedClub.id, userId);
    setApplicants((prev) => prev.filter((a) => a.id !== userId));
  };

  const handleReject = (userId: string) => {
    if (!hostedClub) return;
    mockApplicants.reject(hostedClub.id, userId);
    setApplicants((prev) => prev.filter((a) => a.id !== userId));
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await authService.signOut();
    router.replace("/");
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    await authService.deleteAccount();
    router.replace("/");
  };

  return (
    <Settings
      user={user}
      isLoading={isLoading}
      isHost={!!hostedClub}
      hostedClubName={hostedClub?.name}
      applicants={applicants}
      onAccept={handleAccept}
      onReject={handleReject}
      onSignOut={handleSignOut}
      onDeleteAccount={handleDeleteAccount}
    />
  );
}
