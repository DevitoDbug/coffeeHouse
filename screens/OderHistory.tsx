import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenContainer } from "../assets/constants";

export const OderHistory = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text>OderHistory</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
  },
});
