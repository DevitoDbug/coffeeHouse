import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ItemCard } from "./ItemCard";

export interface CoffeeBeanType {
  id: number;
  name: string;
  description: string;
  cost: number;
  image: string;
  ratting: string;
}

export interface CoffeeTypesFlatListProps {
  coffeeBean: CoffeeBeanType[];
}

export const CoffeeBeansFlatList = ({
  coffeeBean,
}: CoffeeTypesFlatListProps): JSX.Element => {
  const renderItem = ({ item }: { item: CoffeeBeanType }) => {
    return (
      <ItemCard
        id={item.id}
        cost={item.cost}
        description={item.description}
        name={item.name}
        image={item.image}
        ratting={item.ratting}
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