import { Text, View } from "react-native";

import { Application } from "@/shared/const/applications.store";

import { ApplicantRow } from "./ApplicantRow";

type Props = {
  applicants: Application[];
  hostedClubName?: string;
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
};

export function ApplicantsList({ applicants, hostedClubName, onAccept, onReject }: Props) {
  return (
    <View className="mx-4 mb-4 bg-white/15 rounded-3xl px-4">
      <Text className="text-xs font-semibold text-white/60 uppercase tracking-widest pt-4 pb-1">
        {hostedClubName ? `Applications — ${hostedClubName}` : "Applications"}
      </Text>
      {applicants.length === 0 ? (
        <View className="py-4">
          <Text className="text-white/40 text-sm text-center">No pending applications</Text>
        </View>
      ) : (
        applicants.map((a) => (
          <ApplicantRow
            key={a.userId}
            name={a.userName}
            onAccept={() => onAccept(a.userId)}
            onReject={() => onReject(a.userId)}
          />
        ))
      )}
    </View>
  );
}
