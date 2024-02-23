import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ItemCard } from "./ItemCard";

export interface CoffeeType {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  cost: number;
  image: string;
  ratting: number;
  liked: boolean;
  numberOfRattings: number;
}

export interface CoffeeTypesFlatListProps {
  coffeeData: CoffeeType[];
}

export const CoffeeTypesFlatList = ({
  coffeeData,
}: CoffeeTypesFlatListProps): JSX.Element => {
  const renderItem = ({ item }: { item: CoffeeType }) => {
    return (
      <ItemCard
        id={item.id}
        cost={item.cost}
        name={item.name}
        image={item.image}
        ratting={item.ratting}
        liked={item.liked}
        longDescription={item.longDescription}
        shortDescription={item.shortDescription}
        numberOfRattings={item.numberOfRattings}
      />
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
    justifyContent: "space-between",
    gap: 22,
  },
});
