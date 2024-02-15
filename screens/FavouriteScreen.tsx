import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreensNavBar } from "../components/global/ScreensNavBar";
import { screenContainer } from "../assets/constants";

export const FavouriteScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text>FavouriteScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
  },
});
