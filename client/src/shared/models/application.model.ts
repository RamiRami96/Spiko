export type ApplicationStatus = "waiting" | "approved" | "rejected" | "cancelled";

export type Application = {
  userId: string;
  userName: string;
  clubId: string;
  clubName: string;
  status: ApplicationStatus;
};
