import { Club } from "@/shared/models/club.model";

export type ClubsAction =
  | { type: "SET"; clubs: Club[] }
  | { type: "ADD"; club: Club }
  | { type: "REMOVE"; clubId: string }
  | { type: "PURGE_EXPIRED" }
  | { type: "INCREMENT_MEMBER_COUNT"; clubId: string }
  | { type: "MARK_REGISTERED"; clubId: string };

export function clubsReducer(state: Club[], action: ClubsAction): Club[] {
  switch (action.type) {
    case "SET":
      return action.clubs;
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
    case "MARK_REGISTERED":
      return state.map((c) =>
        c.id === action.clubId ? { ...c, isRegistered: true } : c
      );
  }
}
