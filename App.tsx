import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StackNavigation } from "./navigation/StackNavigation";
import { screenContainer } from "./assets/constants";
import { TabNavigation } from "./navigation/TabNavigation";

ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "poppins-black": require("./assets/fonts/Poppins-Black.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-extrabold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extralight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "poppins-light": require("./assets/fonts/Poppins-Light.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-thin": require("./assets/fonts/Poppins-Thin.ttf"),
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
        {/* <StackNavigation /> */}
        <TabNavigation />
      </NavigationContainer>
      <StatusBar style="light" animated={true} backgroundColor="transparent" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...screenContainer,
  },
});
