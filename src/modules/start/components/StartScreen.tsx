import { router } from "expo-router";

import { useStartAnimation } from "../hooks/useStartAnimation";
import { Start } from "../Start";

export function StartScreen() {
  const { logoStyle, titleStyle, descStyle, buttonsStyle } = useStartAnimation();

  return (
    <Start
      onGetStarted={() => router.push("/sign-up")}
      onSignIn={() => router.push("/sign-in")}
      logoStyle={logoStyle}
      titleStyle={titleStyle}
      descStyle={descStyle}
      buttonsStyle={buttonsStyle}
    />
  );
}
