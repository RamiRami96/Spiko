import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@/shared/models/user.model";

const USERS_KEY = "auth_users";
const SESSION_KEY = "auth_session";

type StoredUser = User & { password: string };

async function getUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function saveUsers(users: StoredUser[]): Promise<void> {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const authService = {
  async signUp(data: {
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
  }): Promise<User> {
    const users = await getUsers();

    if (users.some((u) => u.email === data.email)) {
      throw new Error("Email already registered");
    }

    const user: StoredUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      createdAt: new Date().toISOString(),
    };

    await saveUsers([...users, user]);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));

    const { password: _, ...publicUser } = user;
    return publicUser;
  },

  async signIn(email: string, password: string): Promise<User> {
    const users = await getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));

    const { password: _, ...publicUser } = user;
    return publicUser;
  },

  async signOut(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { password: _, ...user } = JSON.parse(raw) as StoredUser;
    return user;
  },

  async deleteAccount(): Promise<void> {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const { id } = JSON.parse(raw) as StoredUser;
    const users = await getUsers();
    await saveUsers(users.filter((u) => u.id !== id));
    await AsyncStorage.removeItem(SESSION_KEY);
  },
};
