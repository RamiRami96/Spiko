import { Club } from "@/shared/models/club.model";

import { MOCK_CLUBS } from "./const/mock-clubs";

let clubs: Club[] = [...MOCK_CLUBS];
const listeners = new Set<() => void>();

export const clubsStore = {
  getAll: () => clubs,
  add: (club: Club) => {
    clubs = [club, ...clubs];
    listeners.forEach((l) => l());
  },
  remove: (clubId: string) => {
    clubs = clubs.filter((c) => c.id !== clubId);
    listeners.forEach((l) => l());
  },
  purgeExpired: () => {
    const before = clubs.length;
    clubs = clubs.filter((c) => new Date(c.startDate) > new Date());
    if (clubs.length !== before) listeners.forEach((l) => l());
  },
  incrementMemberCount: (clubId: string) => {
    clubs = clubs.map((c) =>
      c.id === clubId ? { ...c, currentMemberCount: c.currentMemberCount + 1 } : c
    );
    listeners.forEach((l) => l());
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
