import { StyleSheet, Text, View } from "react-native";
import React from "react";

export interface ItemType {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface ItemProps {
  item: ItemType;
}

export const Item = ({ item }: ItemProps): JSX.Element => {
  return (
    <View>
      <Text>Item</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
