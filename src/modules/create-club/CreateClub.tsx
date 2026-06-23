import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";

import { GradientButton } from "@/shared/components";
import { CreateClubFields } from "./model/create-club.model";

import { DateTimePickerField } from "./components/DateTimePickerField";
import { Field } from "./components/Field";

type Props = {
  fields: CreateClubFields;
  isLoading: boolean;
  onChange: (key: keyof CreateClubFields, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  top: number;
  bottom: number;
};

export function CreateClub({ fields, isLoading, onChange, onSubmit, onBack, top, bottom }: Props) {

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
