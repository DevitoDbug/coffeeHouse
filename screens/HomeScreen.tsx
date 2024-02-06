import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, container } from "../assets/images/constants";
import AppHeader from "../components/global/AppHeader";

export const HomeScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...container,
    flex: 1,
    backgroundColor: colors.primary_bg_dark,
    alignItems: "center",
  },
});
