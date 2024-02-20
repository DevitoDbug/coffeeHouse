import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { CategoryInfo } from "./CategoryInfo";
import {
  BORDERRADIUS,
  COLORS,
  textlight_regular,
} from "../../assets/constants";

export type CoffeeOrder = {
  id: string;
  imageURL: string;
  title: string;
  shortDescription: string;
  smallPrice: number;
  mediumPrice: number;
  largePrice: number;
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
  "250gPrice": number;
  "500gPrice": number;
  "1kgPrice": number;
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
            {item.quantity["1kg"] > 0 && (
              <CategoryInfo
                categoryItem={{
                  categoryLabel: "1kg",
                  price: item["1kgPrice"],
                  quantity: item.quantity["1kg"],
                  totalPrice: item["1kgPrice"] * item.quantity["1kg"],
                }}
              />
            )}
            {item.quantity["500g"] > 0 && (
              <CategoryInfo
                categoryItem={{
                  categoryLabel: "500g",
                  price: item["500gPrice"],
                  quantity: item.quantity["500g"],
                  totalPrice: item["500gPrice"] * item.quantity["500g"],
                }}
              />
            )}
            {item.quantity["250g"] > 0 && (
              <CategoryInfo
                categoryItem={{
                  categoryLabel: "250g",
                  price: item["250gPrice"],
                  quantity: item.quantity["250g"],
                  totalPrice: item["250gPrice"] * item.quantity["250g"],
                }}
              />
            )}
          </View>
        ) : (
          <View style={styles.categoryInfoContainer}>
            {item.quantity.small > 0 && (
              <CategoryInfo
                categoryItem={{
                  categoryLabel: "S",
                  price: item.smallPrice,
                  quantity: item.quantity.small,
                  totalPrice: item.smallPrice * item.quantity.small,
                }}
              />
            )}
            {item.quantity.medium > 0 && (
              <CategoryInfo
                categoryItem={{
                  categoryLabel: "M",
                  price: item.mediumPrice,
                  quantity: item.quantity.medium,
                  totalPrice: item.mediumPrice * item.quantity.medium,
                }}
              />
            )}
            {item.quantity.large > 0 && (
              <CategoryInfo
                categoryItem={{
                  categoryLabel: "L",
                  price: item.largePrice,
                  quantity: item.quantity.large,
                  totalPrice: item.largePrice * item.quantity.large,
                }}
              />
            )}
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
