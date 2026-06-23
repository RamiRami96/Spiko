import { useWindowDimensions, View } from "react-native";

import { PARTICLES } from "../const/particles.const";
import { FloatingLetter } from "./FloatingLetter";

export function FloatingLetters() {
  const { height } = useWindowDimensions();

  return (
    <View
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      pointerEvents="none"
    >
      {PARTICLES.map((particle, i) => (
        <FloatingLetter key={i} particle={particle} screenHeight={height} />
      ))}
    </View>
  );
}
