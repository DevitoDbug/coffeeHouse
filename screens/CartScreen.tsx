import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreensNavBar } from "../components/global/ScreensNavBar";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  return (
    <SafeAreaView>
      <Text>CartScreen</Text>
      <ScreensNavBar pageName={"CartScreen"} />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
