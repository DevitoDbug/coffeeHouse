import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { GradientBox } from "../global/GradientBox";
import { BORDERRADIUS } from "../../assets/constants";
import { CoffeeBeansOrder, CoffeeOrder, Item } from "./Item";

export type OrderType = CoffeeOrder | CoffeeBeansOrder;

export interface OrderItemType {
  id: string;
  date: string;
  totalAmount: number;
  items: OrderType[];
}
export interface OrderItemProps {
  orderItem: OrderItemType;
}

export const OrderItem = ({ orderItem }: OrderItemProps): JSX.Element => {
  return (
    <View>
      {orderItem.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <GradientBox xStyles={styles.gradientBox}>
            <Text>something</Text>
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
  gradientBox: {
    paddingVertical: 13,
    paddingHorizontal: 18,
  },
});
