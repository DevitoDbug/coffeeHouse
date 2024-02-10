import React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { FlatlistItemGradient } from "../global/FlatListItemGradient";

export interface CoffeeType {
  id: number;
  name: string;
  description: string;
  cost: number;
  image?: string;
}

export interface CoffeeTypesFlatListProps {
  coffeeData: CoffeeType[];
}

export const CoffeeTypesFlatList = ({
  coffeeData,
}: CoffeeTypesFlatListProps): JSX.Element => {
  const renderItem = ({ item }: { item: CoffeeType }) => {
    return (
      <View style={styles.coffeeContainer}>
        <FlatlistItemGradient>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.itemImage}
          />
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>{item.cost}</Text>
        </FlatlistItemGradient>
      </View>
    );
  };

  return (
    <FlatList
      data={coffeeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    display: "flex",
    height: 246,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    gap: 22,
  },
  coffeeContainer: {
    height: 246,
    width: 149,
    borderRadius: 23,
    display: "flex",
  },
  itemImage: {
    width: 126,
    height: 126,
    borderRadius: 11,
  },
});
