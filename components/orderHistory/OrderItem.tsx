import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ItemType } from "./Item";
import { GradientBox } from "../global/GradientBox";
import { BORDERRADIUS } from "../../assets/constants";

export interface OrderItemType {
  id: string;
  imageURL: string;
  date: string;
  totalAmount: number;
  items: ItemType[];
}
export interface OrderItemProps {
  items: OrderItemType[];
}

export const OrderItem = ({ items }: OrderItemProps): JSX.Element => {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <GradientBox>
            <Text>{item.id}</Text>
            <Text>{item.imageURL}</Text>
            <Text>{item.date}</Text>
            <Text>{item.totalAmount}</Text>
          </GradientBox>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    marginVertical: 10,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
});
