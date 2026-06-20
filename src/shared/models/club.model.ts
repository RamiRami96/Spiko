type ClubStatus = "active" | "cancelled" | "full";

export type Club = {
  id: string;
  name: string;
  description: string;
  location: string;
  maxMembers: number;
  currentMemberCount: number;
  status: ClubStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  host: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  isRegistered: boolean;
};
