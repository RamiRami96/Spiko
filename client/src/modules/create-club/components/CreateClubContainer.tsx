import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { clubsService } from "@/shared/services";
import { useClubsDispatch } from "@/state/clubs/clubs.context";

import { CreateClub } from "../CreateClub";
import { EMPTY_CLUB_FIELDS } from "../const/create-club.const";
import { CreateClubFields } from "../model/create-club.model";

export function CreateClubContainer() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useClubsDispatch();
  const [fields, setFields] = useState<CreateClubFields>(EMPTY_CLUB_FIELDS);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof CreateClubFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const club = await clubsService.create({
        name: fields.name || "Untitled Club",
        description: fields.description,
        location: fields.location,
        startDate: fields.startDate
          ? new Date(fields.startDate).toISOString()
          : new Date().toISOString(),
        maxMembers: parseInt(fields.maxMembers, 10) || 20,
      });
      dispatch({ type: "ADD", club });
      router.replace("/(main)/clubs");
    } finally {
      setIsLoading(false);
    }
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
