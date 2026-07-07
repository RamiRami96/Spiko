import { Text } from "react-native";

import { ConfirmModal } from "@/shared/components";

type Props = {
  visible: boolean;
  clubName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteClubModal({ visible, clubName, onConfirm, onCancel }: Props) {
  return (
    <ConfirmModal
      visible={visible}
      title="Delete Club?"
      description={
        <Text className="text-white/60 text-sm text-center leading-5">
          This will permanently remove{"\n"}
          <Text className="text-white font-semibold">{clubName}</Text>
          {"\n"}and cannot be undone.
        </Text>
      }
      confirmLabel="Yes, Delete"
      icon={{ name: "trash-outline", color: "#F87171", bgClass: "bg-red-500/20" }}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
