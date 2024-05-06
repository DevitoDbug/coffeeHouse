import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  textlight_medium,
  textlight_semibold,
} from "../../assets/constants";

export interface CategoryItemType {
  categoryLabel: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CategoryInfoProps {
  categoryItem: CategoryItemType;
}

export const CategoryInfo = ({
  categoryItem,
}: CategoryInfoProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryAndPriceContainer}>
        <View>
          <Text style={styles.quantitiyLabel}>
            {categoryItem.categoryLabel}
          </Text>
        </View>
        <View>
          <Text style={styles.costLabel}>
            <Text style={{ color: COLORS.primaryOrangeHex }}>$ </Text>
            {categoryItem.price}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={{ ...textlight_semibold, fontSize: 16 }}>
          <Text style={{ color: COLORS.primaryOrangeHex }}>X </Text>
          {categoryItem.quantity}
        </Text>
      </View>
      <View style={styles.priceValue}>
        <Text
          style={{
            ...textlight_semibold,
            fontSize: 16,
            color: COLORS.primaryOrangeHex,
          }}
        >
          {categoryItem.totalPrice}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryAndPriceContainer: {
    height: 35,
    width: 141,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_10,
    overflow: "hidden",
    gap: 1,
  },
  quantitiyLabel: {
    backgroundColor: COLORS.primaryBlackHex,
    ...textlight_medium,
    fontSize: 16,
    flex: 1,
    width: (141 * 35) / 100,
    textAlign: "center",
    textAlignVertical: "center",
  },
  costLabel: {
    ...textlight_semibold,
    fontSize: 16,
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
    width: (141 * 75) / 100,
    textAlign: "center",
    textAlignVertical: "center",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  priceValue: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
