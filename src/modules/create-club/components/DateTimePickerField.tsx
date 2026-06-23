import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function DateTimePickerField({ label, value, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  const dateValue = value ? new Date(value) : undefined;
  const displayText = dateValue
    ? dateValue.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
      "  " +
      dateValue.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : null;

  const handleConfirm = (date: Date) => {
    setVisible(false);
    const pad = (n: number) => String(n).padStart(2, "0");
    onChange(
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
    );
  };

  return (
    <View style={{ gap: 6 }}>
      <Text className="text-white/70 text-xs font-semibold uppercase tracking-widest">{label}</Text>
      <Pressable
        onPress={() => setVisible(true)}
        className="bg-white/15 rounded-2xl px-4 active:opacity-70"
        style={{ height: 52, flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <Ionicons name="calendar-outline" size={18} color="rgba(255,255,255,0.5)" />
        <Text style={{ color: displayText ? "#fff" : "rgba(255,255,255,0.35)", fontSize: 14 }}>
          {displayText ?? "Select date & time"}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={visible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        minimumDate={new Date()}
        date={dateValue ?? new Date()}
      />
    </View>
  );
}
