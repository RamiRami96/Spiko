import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  maximumDate?: Date;
  minimumDate?: Date;
};

export function DatePickerInput({
  value,
  onChange,
  placeholder = "Select date",
  error,
  maximumDate,
  minimumDate,
}: Props) {
  const [visible, setVisible] = useState(false);

  const dateValue = value ? new Date(value) : undefined;
  const displayText = dateValue
    ? dateValue.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const handleConfirm = (date: Date) => {
    setVisible(false);
    const pad = (n: number) => String(n).padStart(2, "0");
    onChange(`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`);
  };

  return (
    <View className="gap-1">
      <Pressable
        onPress={() => setVisible(true)}
        className={`flex-row items-center bg-gray-100 rounded-2xl px-4 h-14 active:opacity-70 ${
          error ? "border border-red-400" : ""
        }`}
      >
        <Text className="flex-1 text-base" style={{ color: displayText ? "#1F2937" : "#9CA3AF" }}>
          {displayText ?? placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
      </Pressable>
      {error && <Text className="text-red-500 text-xs ml-1">{error}</Text>}
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
        date={dateValue ?? new Date()}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
    </View>
  );
}
