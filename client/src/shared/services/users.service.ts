import { request } from "./api";

export const usersService = {
  getHostedClub: (): Promise<{ id: string } | null> =>
    request("/users/me/hosted-club"),
};
