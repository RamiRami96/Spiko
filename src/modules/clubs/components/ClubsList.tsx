import { useMemo, useState } from "react";

import { Clubs } from "../Clubs";
import { MOCK_CLUBS } from "../const/mock-clubs";

export function ClubsList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClubs = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_CLUBS;
    const q = searchQuery.toLowerCase();
    return MOCK_CLUBS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <Clubs
      clubs={filteredClubs}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
}
