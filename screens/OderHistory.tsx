import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreensNavBar } from "../components/global/ScreensNavBar";

export const OderHistory = (): JSX.Element => {
  return (
    <SafeAreaView>
      <Text>OderHistory</Text>
      {/* <ScreensNavBar pageName={"NotificationsScreen"} /> */}
    </SafeAreaView>
  );
};

export default OderHistory;

const styles = StyleSheet.create({});
