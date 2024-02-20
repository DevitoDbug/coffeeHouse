import { StyleSheet, Text, View } from "react-native";
import React from "react";

export type CoffeeOrder = {
  id: string;
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  product: "coffee";
  category: "medium" | "small" | "large";
  quantity: number;
};

export type CoffeeBeansOrder = {
  id: string;
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  product: "coffee beans";
  category: "500g" | "250g" | "1kg";
  quantity: number;
};

export interface ItemProps {
  item: CoffeeOrder | CoffeeBeansOrder;
}

export const Item = ({ item }: ItemProps): JSX.Element => {
  return (
    <View>
      <Text>Item</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
