import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  error?: string;
  isPassword?: boolean;
};

export function Input({ error, isPassword, secureTextEntry, style, ...props }: Props) {
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View className="gap-1">
      <View
        className={`flex-row items-center bg-gray-100 rounded-2xl px-4 h-14 ${
          error ? "border border-red-400" : ""
        }`}
      >
        <TextInput
          className="flex-1 text-gray-800 text-base"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={hidden}
          {...props}
        />
        {isPassword && (
          <Pressable onPress={() => setHidden((h) => !h)} className="pl-2">
            <Text className="text-gray-400 text-sm">{hidden ? "Show" : "Hide"}</Text>
          </Pressable>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs ml-1">{error}</Text>}
    </View>
  );
}
