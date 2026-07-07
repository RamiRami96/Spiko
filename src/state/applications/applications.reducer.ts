export type ApplicationStatus = "waiting" | "approved" | "rejected";

export type Application = {
  userId: string;
  userName: string;
  clubId: string;
  clubName: string;
  status: ApplicationStatus;
};

export type ApplicationsAction =
  | { type: "APPLY"; entry: Omit<Application, "status"> }
  | { type: "ACCEPT"; userId: string; clubId: string }
  | { type: "REJECT"; userId: string; clubId: string };

export function applicationsReducer(
  state: Application[],
  action: ApplicationsAction
): Application[] {
  switch (action.type) {
    case "APPLY": {
      const exists = state.some(
        (a) => a.userId === action.entry.userId && a.clubId === action.entry.clubId
      );
      if (exists) return state;
      return [...state, { ...action.entry, status: "waiting" }];
    }
    case "ACCEPT":
      return state.map((a) =>
        a.userId === action.userId && a.clubId === action.clubId
          ? { ...a, status: "approved" }
          : a
      );
    case "REJECT":
      return state.map((a) =>
        a.userId === action.userId && a.clubId === action.clubId
          ? { ...a, status: "rejected" }
          : a
      );
  }
}
