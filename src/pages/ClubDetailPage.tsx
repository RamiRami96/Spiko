import { useRouter } from "expo-router";

import { ClubDetail } from "@/modules/clubs/ClubDetail";
import { MOCK_CLUBS } from "@/modules/clubs/const/mock-clubs";

type Props = {
  id: string;
  onBack: () => void;
};

export function ClubDetailPage({ id, onBack }: Props) {
  const router = useRouter();
  const club = MOCK_CLUBS.find((c) => c.id === id);

  if (!club) return null;

  const handleApply = () => {
    router.replace("/(main)/clubs");
  };

  return <ClubDetail club={club} onApply={handleApply} onBack={onBack} />;
}
