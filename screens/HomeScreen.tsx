import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { boldTitles, colors, container } from "../assets/images/constants";
import AppHeader from "../components/global/AppHeader";
import { Search } from "../components/home/Search";
import { Navbar } from "../components/home/Navbar";
import {
  CoffeeType,
  CoffeeTypesFlatList,
} from "../components/home/CoffeeTypesFlatList";

export const HomeScreen = (): JSX.Element => {
  const coffeeData: CoffeeType[] = [
    {
      id: 1,
      name: "Espresso",
      description: "With Steamed Milk",
      cost: 4.2,
      image:
        "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "With Foam",
      cost: 3.5,
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      name: "Latte",
      description: "With Steamed Milk",
      cost: 3.8,
      image:
        "https://media.istockphoto.com/id/173245886/photo/cappuccino.jpg?s=612x612&w=0&k=20&c=M622fenNX65OGemtZR0LDCq4LVvxNZJygI5Y4D4NV9g=",
    },
    {
      id: 4,
      name: "Mocha",
      description: "With Chocolate",
      cost: 4.0,
      image:
        "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    },
    {
      id: 5,
      name: "Macchiato",
      description: "With Foam",
      cost: 3.8,
      image:
        "data:image/jpeg;base64,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",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.topSection}>
          <AppHeader />
        </View>
        <View style={styles.middleSection}>
          <Text style={styles.boldTitle}>Find the best coffee for you</Text>
          <Search />
        </View>
        <View style={styles.bottomSection}>
          <Navbar />
          <View style={styles.topFlatlist}>
            <CoffeeTypesFlatList coffeeData={coffeeData} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...container,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 0,
  },
  scrollView: {
    flexGrow: 1,
  },
  topSection: { paddingHorizontal: 30 },
  middleSection: {
    display: "flex",
    paddingHorizontal: 30,
    gap: 28,
    alignSelf: "flex-start",
  },
  boldTitle: {
    ...boldTitles,
    width: 195,
    marginTop: 31,
  },
  bottomSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 30,
    marginTop: 30,
    gap: 22,
  },
  topFlatlist: {},
});