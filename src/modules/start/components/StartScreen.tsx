import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import { router } from "expo-router";

import { useStartAnimation } from "../hooks/useStartAnimation";
import { Start } from "../Start";

export function StartScreen() {
  const [fontsLoaded] = useFonts({ Pacifico_400Regular });
  const { logoStyle, titleStyle, descStyle, buttonsStyle } = useStartAnimation();

  return (
    <Start
      onGetStarted={() => router.push("/sign-up")}
      onSignIn={() => router.push("/sign-in")}
      logoStyle={logoStyle}
      titleStyle={titleStyle}
      descStyle={descStyle}
      buttonsStyle={buttonsStyle}
      fontsLoaded={fontsLoaded}
    />
  );
}
