import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

type Props = {
  topContent: ReactNode;
  children: ReactNode;
};

export function ScreenLayout({ topContent, children }: Props) {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#EC4899", "#8B5CF6", "#4F46E5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="h-56 items-center justify-end pb-10 px-6"
      >
        {topContent}
      </LinearGradient>

      <ScrollView
        className="flex-1 bg-white rounded-t-3xl -mt-6"
        contentContainerClassName="px-6 pt-8 pb-12"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}
