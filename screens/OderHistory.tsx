import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreensNavBar } from "../components/global/ScreensNavBar";
import { SafeAreaView } from "react-native-safe-area-context";

const OderHistory = () => {
  return (
    <SafeAreaView>
      <Text>OderHistory</Text>
      <ScreensNavBar pageName={"NotificationsScreen"} />
    </SafeAreaView>
  );
};

export default OderHistory;

const styles = StyleSheet.create({});
