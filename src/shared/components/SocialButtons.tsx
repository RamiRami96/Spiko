import { Text, View } from "react-native";

type Props = {
  label: string;
};

export function SocialButtons({ label }: Props) {
  return (
    <View className="gap-4">
      <View className="flex-row items-center gap-3">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="text-gray-400 text-sm">{label}</Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      <View className="flex-row justify-center gap-4">
        {[
          { label: "f", bg: "bg-blue-600" },
          { label: "G", bg: "bg-white border border-gray-200" },
          { label: "", bg: "bg-black" },
        ].map((item) => (
          <View
            key={item.label}
            className={`w-12 h-12 rounded-full items-center justify-center ${item.bg}`}
          >
            <Text
              className={`font-bold text-base ${
                item.label === "G" ? "text-gray-700" : "text-white"
              }`}
            >
              {item.label || "🍎"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
