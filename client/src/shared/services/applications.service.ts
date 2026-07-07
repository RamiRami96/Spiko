import { request } from "./api";

export type Applicant = {
  userId: string;
  user: { id: string; name: string; avatarUrl?: string };
  clubId: string;
  status: "waiting" | "approved" | "rejected" | "cancelled";
};

export type MyApplication = {
  clubId: string;
  clubName: string;
  status: "waiting" | "approved" | "rejected" | "cancelled";
  registeredAt: string;
  club: { id: string; name: string; startDate: string; location: string };
};

export const applicationsService = {
  getApplicants: (clubId: string): Promise<Applicant[]> =>
    request(`/clubs/${clubId}/applicants`),

  accept: (clubId: string, userId: string): Promise<void> =>
    request(`/clubs/${clubId}/applicants/${userId}/accept`, { method: "PATCH" }),

  reject: (clubId: string, userId: string): Promise<void> =>
    request(`/clubs/${clubId}/applicants/${userId}/reject`, { method: "PATCH" }),

  getMyApplications: (): Promise<MyApplication[]> =>
    request("/users/me/applications"),
};
