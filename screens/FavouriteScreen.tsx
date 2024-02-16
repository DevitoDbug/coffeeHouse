import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { FavouriteItem, Item } from "../components/favourite/Item";
import { screenContainer } from "../assets/constants";

const testData: FavouriteItem[] = [
  {
    id: 1,
    imageURl:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    liked: true,
    name: "Cappuccino",
    shortDescription: "With milk",
    ratting: 4.5,
    numberOfRattings: 100,
    longDescription:
      "Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.",
  },
  {
    id: 2,
    imageURl:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    liked: false,
    name: "Espresso",
    shortDescription: "Strong coffee",
    ratting: 4.2,
    numberOfRattings: 80,
    longDescription:
      "Espresso is a concentrated coffee brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans.",
  },
  {
    id: 3,
    imageURl:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    liked: true,
    name: "Latte",
    shortDescription: "Creamy coffee",
    ratting: 4.7,
    numberOfRattings: 120,
    longDescription:
      "Latte is a coffee drink made with espresso and steamed milk. The term comes from the Italian caffè e latte, meaning 'coffee and milk'.",
  },
];

export const FavouriteScreen = (): JSX.Element => {
  const renderItem = ({ item }: { item: FavouriteItem }) => {
    return (
      <View>
        <Item item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.navBar}>
        <BackNavBarWithProfile title="Favorites" />
      </View>
      <View style={styles.screenBody}>
        <FlatList
          data={testData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
    paddingHorizontal: 0,
  },
  navBar: {
    height: 33,
    marginBottom: 20,
  },
  screenBody: {
    flex: 1,
    paddingHorizontal: 30,
  },
  flatListContainer: {
    display: "flex",
    gap: 28,
    paddingBottom: 70,
  },
});
