import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

import { FloatingLetters } from "./components/FloatingLetters";

export type StartProps = {
  onGetStarted: () => void;
  onSignIn: () => void;
  logoStyle: AnimatedStyle<ViewStyle>;
  titleStyle: AnimatedStyle<ViewStyle>;
  descStyle: AnimatedStyle<ViewStyle>;
  buttonsStyle: AnimatedStyle<ViewStyle>;
  fontsLoaded: boolean;
};

export function Start({ onGetStarted, onSignIn, logoStyle, titleStyle, descStyle, buttonsStyle, fontsLoaded }: StartProps) {

  return (
    <LinearGradient
      colors={["#06B6D4", "#4F46E5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 80, paddingBottom: 48 }}
    >
      <FloatingLetters />
      <View className="flex-1 items-center justify-center gap-8">
        <Animated.View style={logoStyle} className="items-center">
          <Text
            style={{
              fontFamily: fontsLoaded ? "Pacifico_400Regular" : undefined,
              fontSize: 72,
              color: "#fff",
              letterSpacing: 1,
            }}
          >
            Angama
          </Text>
        </Animated.View>

        <Animated.View style={titleStyle} className="items-center gap-2">
          <Text className="text-white/80 text-base text-center">
            Hi there! We're here to help you{"\n"}find and join speaking clubs.
          </Text>
        </Animated.View>

        <Animated.View style={descStyle} className="items-center">
          <Text className="text-white/70 text-sm text-center px-4">
            The choice is yours:{" "}
            <Text className="text-white font-semibold underline" onPress={onSignIn}>
              Log in
            </Text>
            {" "}or{" "}
            <Text className="text-white font-semibold underline" onPress={onGetStarted}>
              create an account
            </Text>
            .
          </Text>
        </Animated.View>
      </View>

      <Animated.View style={buttonsStyle} className="w-full gap-3">
        <Pressable
          onPress={onGetStarted}
          className="bg-white h-14 rounded-full items-center justify-center active:opacity-80"
        >
          <Text className="text-primary font-semibold text-base">Create Account</Text>
        </Pressable>

        <Pressable
          onPress={onSignIn}
          className="bg-white/20 h-14 rounded-full items-center justify-center active:opacity-80"
        >
          <Text className="text-white font-semibold text-base">Log In</Text>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}
