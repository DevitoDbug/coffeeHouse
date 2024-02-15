import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreensNavBar } from "../components/global/ScreensNavBar";

export const FavouriteScreen = (): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>FavouriteScreen</Text>
      {/* <ScreensNavBar pageName={"FavouritesScreen"} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
