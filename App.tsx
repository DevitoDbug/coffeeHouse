import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as ExpoSplashScreen from "expo-splash-screen";
import { Navigation } from "./navigation/Navigation";
import { container } from "./assets/images/constants";
import { useFonts } from "expo-font";

ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "poppins-semiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <StatusBar style="light" animated={true} backgroundColor="transparent" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...container,
  },
});
