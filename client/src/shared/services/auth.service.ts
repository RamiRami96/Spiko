import { User } from "@/shared/models/user.model";
import { clearSid, request, storeSid } from "./api";

export const authService = {
  async signUp(data: { name: string; email: string; password: string; dateOfBirth: string }): Promise<User> {
    const { _sid, ...user } = await request<User & { _sid: string }>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
    await storeSid(_sid);
    return user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const { _sid, ...user } = await request<User & { _sid: string }>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    await storeSid(_sid);
    return user;
  },

  async signOut(): Promise<void> {
    await request("/auth/sign-out", { method: "POST" }).catch(() => {});
    await clearSid();
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      return await request<User>("/auth/me");
    } catch {
      await clearSid();
      return null;
    }
  },

  async deleteAccount(): Promise<void> {
    await request("/auth/account", { method: "DELETE" });
    await clearSid();
  },
};
