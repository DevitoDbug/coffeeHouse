import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/global/AppHeader";
import { Search } from "../components/home/Search";
import { Navbar } from "../components/home/Navbar";
import {
  CoffeeType,
  CoffeeTypesFlatList,
} from "../components/home/CoffeeTypesFlatList";
import {
  CoffeeBeanType,
  CoffeeBeansFlatList,
} from "../components/home/CoffeeBeansFlatList";
import {
  SCREENWIDTH,
  screenContainer,
  textbold,
  textlight_medium,
} from "../assets/constants";
import { CoffeeBeanDummyData, CoffeeDummyData } from "../store/dummyData";

export const HomeScreen = (): JSX.Element => {
  const coffeeData: CoffeeType[] = CoffeeDummyData;

  const coffeeBean: CoffeeBeanType[] = CoffeeBeanDummyData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <AppHeader />
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.boldTitle}>Find the best coffee for you</Text>
        <Search />
        <View style={{ width: SCREENWIDTH - 30 }}>
          <Navbar />
        </View>
      </View>
      <View></View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.bottomSection}>
          <View style={styles.topFlatlist}>
            <CoffeeTypesFlatList coffeeData={coffeeData} />
          </View>
          <View style={styles.coffeeBeanFlatlist}>
            <Text
              style={{ ...textlight_medium, fontSize: 16, marginBottom: 19 }}
            >
              Coffee beans
            </Text>
            <CoffeeBeansFlatList coffeeBean={coffeeBean} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...screenContainer,
    position: "relative",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  topSection: {
    paddingHorizontal: 30,
  },
  middleSection: {
    display: "flex",
    paddingHorizontal: 30,
    gap: 28,
    alignSelf: "flex-start",
  },
  boldTitle: {
    ...textbold,
    fontSize: 28,
    width: 195,
    marginTop: 31,
  },
  bottomSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 30,
    gap: 22,
    marginBottom: 35,
  },
  topFlatlist: {
    height: 245,
  },
  coffeeBeanFlatlist: {
    height: 300,
    marginBottom: 8,
  },
  screenNavBar: {
    position: "absolute",
    bottom: 0,
  },
});
