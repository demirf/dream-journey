import React, {useEffect} from "react";
import { Stack } from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  const [loaded] = useFonts({
    LoraItalic: require('../assets/fonts/Lora-Italic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar hidden={true} />
    </>
  )
}
