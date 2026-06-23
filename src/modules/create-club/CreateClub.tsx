import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GradientButton } from "@/shared/components";

export type CreateClubFields = {
  name: string;
  description: string;
  location: string;
  startDate: string;
  maxMembers: string;
};

type Props = {
  fields: CreateClubFields;
  isLoading: boolean;
  onChange: (key: keyof CreateClubFields, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  keyboardType,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text className="text-white/70 text-xs font-semibold uppercase tracking-widest">{label}</Text>
      <View
        className="bg-white/15 rounded-2xl px-4"
        style={{ minHeight: multiline ? 100 : 52, justifyContent: "center" }}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.35)"
          multiline={multiline}
          keyboardType={keyboardType}
          className="text-white text-sm"
          style={{ paddingVertical: 12, textAlignVertical: multiline ? "top" : "center" }}
        />
      </View>
    </View>
  );
}

function DateTimePickerField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
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

export function CreateClub({ fields, isLoading, onChange, onSubmit, onBack }: Props) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#06B6D4", "#4F46E5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: top + 16,
          paddingBottom: bottom + 32,
          paddingHorizontal: 16,
          gap: 20,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={onBack}
          className="flex-row items-center gap-2 active:opacity-70 self-start"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
          <Text className="text-white font-medium text-base">Back</Text>
        </Pressable>

        <Text className="text-white font-bold text-3xl">Create Club</Text>

        <View className="gap-4">
          <Field
            label="Name"
            value={fields.name}
            onChange={(v) => onChange("name", v)}
            placeholder="Club name"
          />
          <Field
            label="Description"
            value={fields.description}
            onChange={(v) => onChange("description", v)}
            placeholder="What is this club about?"
            multiline
          />
          <Field
            label="Location"
            value={fields.location}
            onChange={(v) => onChange("location", v)}
            placeholder="e.g. Astana, Room 201"
          />
          <DateTimePickerField
            label="Start Date & Time"
            value={fields.startDate}
            onChange={(v) => onChange("startDate", v)}
          />
          <Field
            label="Max Members"
            value={fields.maxMembers}
            onChange={(v) => onChange("maxMembers", v)}
            placeholder="e.g. 20"
            keyboardType="numeric"
          />
        </View>

        <GradientButton label="Create Club" onPress={onSubmit} loading={isLoading} />
      </ScrollView>
    </LinearGradient>
  );
}
