import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SCREENWIDTH,
  boldTitles,
  colors,
  container,
} from "../assets/images/constants";
import AppHeader from "../components/global/AppHeader";
import { Search } from "../components/home/Search";
import { Navbar } from "../components/home/Navbar";

export const HomeScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View
        style={{
          width: SCREENWIDTH - 30,
          display: "flex",
          gap: 28,
          alignSelf: "flex-start",
        }}
      >
        <Text style={styles.boldTitle}>Find the best coffee for you</Text>
        <Search />
        <Navbar />
      </View>
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
  boldTitle: {
    ...boldTitles,
    width: 195,
    marginTop: 31,
  },
});
