import { useLocalSearchParams, useRouter } from "expo-router";

import { ClubDetailPage } from "@/pages/ClubDetailPage";

export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return <ClubDetailPage id={id} onBack={() => router.back()} />;
}
