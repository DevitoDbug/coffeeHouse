import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreensNavBar } from "../components/global/ScreensNavBar";
import { SafeAreaView } from "react-native-safe-area-context";

const FavouriteScreen = () => {
  return (
    <SafeAreaView>
      <Text>FavouriteScreen</Text>
      <ScreensNavBar pageName={"FavouritesScreen"} />
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});
