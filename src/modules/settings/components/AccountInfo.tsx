import { Text, View } from "react-native";

import { User } from "@/shared/models/user.model";

import { Row } from "./Row";

type Props = {
  user: User | null;
};

export function AccountInfo({ user }: Props) {
  return (
    <View className="mx-4 mb-4 bg-white/15 rounded-3xl px-4">
      <Text className="text-xs font-semibold text-white/60 uppercase tracking-widest pt-4 pb-1">
        Account
      </Text>
      <Row icon="person-outline" label="Full Name" value={user?.name} />
      <Row icon="mail-outline" label="Email" value={user?.email} />
      <Row icon="calendar-outline" label="Date of Birth" value={user?.dateOfBirth} />
    </View>
  );
}
