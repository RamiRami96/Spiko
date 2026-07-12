import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCreateClubMutation } from "@/shared/queries/clubs.queries";

import { CreateClub } from "../CreateClub";
import { EMPTY_CLUB_FIELDS } from "../const/create-club.const";
import { CreateClubFields } from "../model/create-club.model";

export function CreateClubContainer() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const createClubMutation = useCreateClubMutation();
  const [fields, setFields] = useState<CreateClubFields>(EMPTY_CLUB_FIELDS);

  const handleChange = (key: keyof CreateClubFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await createClubMutation.mutateAsync({
      name: fields.name || "Untitled Club",
      description: fields.description,
      location: fields.location,
      startDate: fields.startDate
        ? new Date(fields.startDate).toISOString()
        : new Date().toISOString(),
      maxMembers: parseInt(fields.maxMembers, 10) || 20,
    });
    router.replace("/(main)/clubs");
  };

  return (
    <CreateClub
      fields={fields}
      isLoading={createClubMutation.isPending}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={() => router.back()}
      top={top}
      bottom={bottom}
    />
  );
}
