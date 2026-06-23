export type ApplicationStatus = "waiting" | "approved" | "rejected";

export type Application = {
  userId: string;
  userName: string;
  clubId: string;
  clubName: string;
  status: ApplicationStatus;
};

let applications: Application[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export const applicationsStore = {
  apply: (entry: Omit<Application, "status">) => {
    const exists = applications.some(
      (a) => a.userId === entry.userId && a.clubId === entry.clubId
    );
    if (!exists) {
      applications = [...applications, { ...entry, status: "waiting" }];
      notify();
    }
  },

  hasApplied: (userId: string, clubId: string) =>
    applications.some((a) => a.userId === userId && a.clubId === clubId),

  getByUserId: (userId: string) =>
    applications.filter((a) => a.userId === userId),

  getByClubId: (clubId: string) =>
    applications.filter((a) => a.clubId === clubId),

  accept: (userId: string, clubId: string) => {
    applications = applications.map((a) =>
      a.userId === userId && a.clubId === clubId ? { ...a, status: "approved" } : a
    );
    notify();
  },

  reject: (userId: string, clubId: string) => {
    applications = applications.map((a) =>
      a.userId === userId && a.clubId === clubId ? { ...a, status: "rejected" } : a
    );
    notify();
  },

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
};
