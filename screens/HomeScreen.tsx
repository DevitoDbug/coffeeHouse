import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../assets/constants";

export const HomeScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text> This is the home screen </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_bg_dark,
    alignItems: "center",
    justifyContent: "center",
  },
});
