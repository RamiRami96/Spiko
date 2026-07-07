import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { Particle } from "../const/particles.const";

export function useParticleAnimation(particle: Particle, screenHeight: number) {
  const y = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const fadeDuration = particle.duration * 0.12;
    const holdDuration = particle.duration - fadeDuration * 2;

    y.value = withDelay(
      particle.delay,
      withRepeat(withTiming(-80, { duration: particle.duration }), -1, false)
    );
    opacity.value = withDelay(
      particle.delay,
      withRepeat(
        withSequence(
          withTiming(particle.maxOpacity, { duration: fadeDuration }),
          withTiming(particle.maxOpacity, { duration: holdDuration }),
          withTiming(0, { duration: fadeDuration })
        ),
        -1,
        false
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
    opacity: opacity.value,
  }));

  return style;
}
