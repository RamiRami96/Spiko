import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
};

export function Field({ label, value, onChange, placeholder, multiline, keyboardType }: Props) {
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
