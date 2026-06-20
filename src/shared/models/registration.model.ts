type RegistrationRole = "speaker" | "listener";
type RegistrationStatus = "pending" | "confirmed" | "waitlisted" | "cancelled";

export type Registration = {
  id: string;
  role: RegistrationRole;
  status: RegistrationStatus;
  registeredAt: string;
  club: {
    id: string;
    name: string;
    startDate: string;
    location: string;
  };
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
};
