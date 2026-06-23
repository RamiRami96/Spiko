import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type Particle = {
  char: string;
  x: number;
  size: number;
  maxOpacity: number;
  duration: number;
  delay: number;
};

// Fixed at module load so layout is stable across re-renders
const PARTICLES: Particle[] = [
  { char: "s", x: 0.08, size: 28, maxOpacity: 0.45, duration: 9000,  delay: 0    },
  { char: "p", x: 0.72, size: 20, maxOpacity: 0.38, duration: 7500,  delay: 1200 },
  { char: "i", x: 0.45, size: 16, maxOpacity: 0.32, duration: 11000, delay: 3000 },
  { char: "k", x: 0.88, size: 24, maxOpacity: 0.50, duration: 8000,  delay: 500  },
  { char: "o", x: 0.25, size: 18, maxOpacity: 0.35, duration: 10000, delay: 2200 },
  { char: "A", x: 0.60, size: 14, maxOpacity: 0.30, duration: 12000, delay: 4000 },
  { char: "B", x: 0.15, size: 22, maxOpacity: 0.42, duration: 8500,  delay: 1800 },
  { char: "C", x: 0.80, size: 16, maxOpacity: 0.33, duration: 9500,  delay: 3500 },
  { char: "k", x: 0.38, size: 30, maxOpacity: 0.28, duration: 13000, delay: 600  },
  { char: "S", x: 0.55, size: 12, maxOpacity: 0.40, duration: 7000,  delay: 2800 },
];

function FloatingLetter({ particle, screenHeight }: { particle: Particle; screenHeight: number }) {
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

  return (
    <Animated.Text
      style={[
        style,
        {
          position: "absolute",
          left: `${particle.x * 100}%` as any,
          top: 0,
          fontSize: particle.size,
          color: "#fff",
          fontWeight: "bold",
        },
      ]}
    >
      {particle.char}
    </Animated.Text>
  );
}

export function FloatingLetters() {
  const { height } = useWindowDimensions();

  return (
    <View
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      pointerEvents="none"
    >
      {PARTICLES.map((p, i) => (
        <FloatingLetter key={i} particle={p} screenHeight={height} />
      ))}
    </View>
  );
}
