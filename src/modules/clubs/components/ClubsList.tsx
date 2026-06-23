import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

import { clubsStore } from "../clubs.store";
import { Clubs } from "../Clubs";
import { useClubs } from "../hooks/useClubs";

export function ClubsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const clubs = useClubs();

  const filteredClubs = useMemo(() => {
    if (!searchQuery.trim()) return clubs;
    const q = searchQuery.toLowerCase();
    return clubs.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }, [searchQuery, clubs]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 600));
    setRefreshing(false);
  };

  return (
    <Clubs
      clubs={filteredClubs}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onPressClub={(id) => {
        if (!clubsStore.getAll().find((c) => c.id === id)) {
          Alert.alert("Club Not Found", "This club no longer exists or has been deleted.");
          return;
        }
        router.push(`/clubs/${id}`);
      }}
      onCreateClub={() => router.push("/clubs/create")}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
}
