import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "@/store/AuthContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { LanguageProvider } from '@/store/LanguageContext';

function RootLayoutNav() {
  const { token, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (token && inAuthGroup) {
        // Giriş yapılmış ve auth sayfasındaysa, app'e yönlendir
        router.replace('/(app)/home');
      } else if (!token && !inAuthGroup) {
        // Giriş yapılmamış ve app sayfasındaysa, auth'a yönlendir
        router.replace('/');
      }
    }
  }, [token, loading, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <LanguageProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        </LanguageProvider>
        <StatusBar hidden={true} />
        <Toast />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}