import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { BORDERRADIUS } from "../../assets/constants";

export type CoffeeOrder = {
  id: string;
  imageURL: string;
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  product: "coffee";
  quantity: {
    small: number;
    medium: number;
    large: number;
  };
};

export type CoffeeBeansOrder = {
  id: string;
  imageURL: string;
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  product: "coffee beans";
  quantity: {
    "250g": number;
    "500g": number;
    "1kg": number;
  };
};

export interface ItemProps {
  item: CoffeeOrder | CoffeeBeansOrder;
}

export const Item = ({ item }: ItemProps): JSX.Element => {
  return (
    <View>
      <View style={styles.topSection}>
        <View style={styles.topLeft}>
          <Image source={{ uri: item.imageURL }} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 57,
    height: 57,
    borderRadius: BORDERRADIUS.radius_15,
  },
});
