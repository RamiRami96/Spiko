import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: {
    name: ComponentProps<typeof Ionicons>["name"];
    color: string;
    bgClass: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  icon,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <View
          className="bg-black/60 rounded-3xl p-6 w-full gap-5"
          style={{ borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" }}
        >
          <View className="items-center gap-4">
            {icon && (
              <View className={`w-16 h-16 rounded-full ${icon.bgClass} items-center justify-center`}>
                <Ionicons name={icon.name} size={36} color={icon.color} />
              </View>
            )}
            <View className="items-center gap-1.5">
              <Text className="text-white font-bold text-xl text-center">{title}</Text>
              {description}
            </View>
          </View>
          <View className="gap-3">
            <Pressable
              onPress={onConfirm}
              className="h-14 rounded-full bg-red-500/30 items-center justify-center active:opacity-70"
            >
              <Text className="text-red-400 font-semibold text-base">{confirmLabel}</Text>
            </Pressable>
            <Pressable
              onPress={onCancel}
              className="h-14 rounded-full bg-white/10 items-center justify-center active:opacity-70"
            >
              <Text className="text-white/70 font-semibold text-base">{cancelLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
