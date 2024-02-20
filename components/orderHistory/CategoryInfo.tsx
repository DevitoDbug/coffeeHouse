import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  BORDERRADIUS,
  COLORS,
  textlight_medium,
  textlight_semibold,
} from "../../assets/constants";

export const CategoryInfo = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryAndPriceContainer}>
        <View>
          <Text style={styles.quantitiyLabel}>S</Text>
        </View>
        <View>
          <Text style={styles.costLabel}>
            <Text style={{ color: COLORS.primaryOrangeHex }}>$ </Text>
            4.20
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={{ ...textlight_semibold, fontSize: 16 }}>
          <Text style={{ color: COLORS.primaryOrangeHex }}>X </Text>3
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
          8.40
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
    width: (141 * 25) / 100,
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
