import { Club } from "@/shared/models/club.model";
import { request } from "./api";

export type CreateClubData = {
  name: string;
  description: string;
  location: string;
  startDate: string;
  maxMembers: number;
};

export const clubsService = {
  getAll: (): Promise<Club[]> => request("/clubs"),

  getOne: (id: string): Promise<Club> => request(`/clubs/${id}`),

  create: (data: CreateClubData): Promise<Club> =>
    request("/clubs", { method: "POST", body: JSON.stringify(data) }),

  remove: (id: string): Promise<void> =>
    request(`/clubs/${id}`, { method: "DELETE" }),

  apply: (clubId: string): Promise<void> =>
    request(`/clubs/${clubId}/apply`, { method: "POST" }),
};
