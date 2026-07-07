import { Club } from "@/shared/models/club.model";

export type ClubsAction =
  | { type: "ADD"; club: Club }
  | { type: "REMOVE"; clubId: string }
  | { type: "PURGE_EXPIRED" }
  | { type: "INCREMENT_MEMBER_COUNT"; clubId: string };

export function clubsReducer(state: Club[], action: ClubsAction): Club[] {
  switch (action.type) {
    case "ADD":
      return [action.club, ...state];
    case "REMOVE":
      return state.filter((c) => c.id !== action.clubId);
    case "PURGE_EXPIRED":
      return state.filter((c) => new Date(c.startDate) > new Date());
    case "INCREMENT_MEMBER_COUNT":
      return state.map((c) =>
        c.id === action.clubId ? { ...c, currentMemberCount: c.currentMemberCount + 1 } : c
      );
  }
}
