import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function useStartAnimation() {
  const logoScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(24);
  const descOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const buttonsY = useSharedValue(24);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });
    titleOpacity.value = withDelay(350, withTiming(1, { duration: 550 }));
    titleY.value = withDelay(350, withTiming(0, { duration: 550 }));
    descOpacity.value = withDelay(700, withTiming(1, { duration: 550 }));
    buttonsOpacity.value = withDelay(1050, withTiming(1, { duration: 500 }));
    buttonsY.value = withDelay(1050, withTiming(0, { duration: 500 }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const descStyle = useAnimatedStyle(() => ({
    opacity: descOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsY.value }],
  }));

  return { logoStyle, titleStyle, descStyle, buttonsStyle };
}
