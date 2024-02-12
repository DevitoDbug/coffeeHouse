import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenContainer } from "../assets/images/constants";
import { ScreensNavBar } from "../components/global/ScreensNavBar";

const PaymentScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text>PaymentScreen</Text>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
  },
});
