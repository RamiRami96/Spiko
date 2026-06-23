import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { clubsStore } from "@/state/clubs.state";
import { useCurrentUser } from "@/modules/settings/hooks/useCurrentUser";

import { CreateClub } from "../CreateClub";
import { EMPTY_CLUB_FIELDS } from "../const/create-club.const";
import { CreateClubFields } from "../model/create-club.model";

export function CreateClubContainer() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const user = useCurrentUser();
  const [fields, setFields] = useState<CreateClubFields>(EMPTY_CLUB_FIELDS);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof CreateClubFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const startDate = fields.startDate
      ? new Date(fields.startDate).toISOString()
      : new Date().toISOString();
    const endDate = new Date(new Date(startDate).getTime() + 2 * 60 * 60 * 1000).toISOString();

    clubsStore.add({
      id: `local-${Date.now()}`,
      name: fields.name || "Untitled Club",
      description: fields.description,
      location: fields.location,
      startDate,
      endDate,
      maxMembers: parseInt(fields.maxMembers, 10) || 20,
      currentMemberCount: 0,
      status: "active",
      createdAt: new Date().toISOString(),
      host: { id: user?.id ?? "me", name: user?.name ?? "You" },
      isRegistered: false,
    });

    setIsLoading(false);
    router.replace("/(main)/clubs");
  };

  return (
    <CreateClub
      fields={fields}
      isLoading={isLoading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={() => router.back()}
      top={top}
      bottom={bottom}
    />
  );
}
