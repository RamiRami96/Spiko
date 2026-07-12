import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
export const API = `http://${debuggerHost ?? "localhost"}:3000`;
const SID_KEY = "connect.sid";

export async function getSid(): Promise<string | null> {
  return AsyncStorage.getItem(SID_KEY);
}

export async function storeSid(sid: string): Promise<void> {
  await AsyncStorage.setItem(SID_KEY, sid);
}

export async function clearSid(): Promise<void> {
  await AsyncStorage.removeItem(SID_KEY);
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const sid = await getSid();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(sid ? { Authorization: `Bearer ${sid}` } : {}),
      ...(options.headers as Record<string, string> | undefined),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message ?? "Request failed");
  }

  return res.json() as Promise<T>;
}
