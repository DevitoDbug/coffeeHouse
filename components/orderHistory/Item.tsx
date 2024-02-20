import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  textlight_regular,
} from "../../assets/constants";
import { CategoryInfo } from "./CategoryInfo";

export type CoffeeOrder = {
  id: string;
  imageURL: string;
  title: string;
  shortDescription: string;
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
  shortDescription: string;
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

type OrderType = CoffeeOrder | CoffeeBeansOrder;

function isCoffeeBeansOrder(order: OrderType): order is CoffeeBeansOrder {
  return (order as CoffeeBeansOrder).product === "coffee beans";
}

export const Item = ({ item }: ItemProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topLeft}>
          <Image source={{ uri: item.imageURL }} style={styles.image} />
          <View style={styles.topLeftTitleBox}>
            <Text style={{ ...textlight_regular, fontSize: 16 }}>
              {item.title}
            </Text>
            <Text style={{ ...textlight_regular, fontSize: 9 }}>
              {item.shortDescription}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ ...textlight_regular, fontSize: 20 }}>
            <Text style={{ color: COLORS.primaryOrangeHex }}>$</Text>
            {item.totalPrice}
          </Text>
        </View>
      </View>
      <View>
        {isCoffeeBeansOrder(item) ? (
          <View style={styles.categoryInfoContainer}>
            <CategoryInfo />
            <CategoryInfo />
            <CategoryInfo />
          </View>
        ) : (
          <View style={styles.categoryInfoContainer}>
            <CategoryInfo />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
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
  topLeftTitleBox: {
    flexDirection: "column",
    justifyContent: "center",
  },
  categoryInfoContainer: {
    display: "flex",
    gap: 10,
  },
});
