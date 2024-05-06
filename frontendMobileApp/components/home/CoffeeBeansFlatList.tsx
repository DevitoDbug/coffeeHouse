import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ItemCard } from "./ItemCard";

export interface CoffeeBeanType {
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

export interface CoffeeBeansTypesFlatListProps {
  coffeeBean: CoffeeBeanType[];
}

export const CoffeeBeansFlatList = ({
  coffeeBean,
}: CoffeeBeansTypesFlatListProps): JSX.Element => {
  const renderItem = ({ item }: { item: CoffeeBeanType }) => {
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
      data={coffeeBean}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      contentContainerStyle={styles.flatListContainer}
      showsHorizontalScrollIndicator={false}
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
