import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { CoffeeCartItemType } from "../../screens/CartScreen";
import { GradientBox } from "../global/GradientBox";
import { QuantityPicker } from "./QuantityPicker";
import { BORDERRADIUS } from "../../assets/constants";
import {
  textlight_regular,
  textlightfaint_medium,
} from "../../assets/constants";

interface CoffeeItemProps {
  coffeeItem: CoffeeCartItemType;
}

export const CoffeeItem = ({ coffeeItem }: CoffeeItemProps): JSX.Element => {
  return (
    <GradientBox xStyles={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={{ uri: coffeeItem.imageURL }}
          style={styles.imageContainer}
        />
        <View style={styles.descriptionArea}>
          <Text
            style={{ ...textlight_regular, fontSize: 16, marginBottom: 10 }}
          >
            {coffeeItem.name}
          </Text>
          <Text style={styles.coffeeDescription}>
            {coffeeItem.shortDescription}
          </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        {coffeeItem.small && (
          <QuantityPicker
            initialQuantity={coffeeItem.small.quantity}
            letterRef="S"
            price={coffeeItem.small.price}
          />
        )}
        {coffeeItem.medium && (
          <QuantityPicker
            initialQuantity={coffeeItem.medium.quantity}
            letterRef="M"
            price={coffeeItem.medium.price}
          />
        )}
        {coffeeItem.large && (
          <QuantityPicker
            initialQuantity={coffeeItem.large.quantity}
            letterRef="L"
            price={coffeeItem.large.price}
          />
        )}
      </View>
    </GradientBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    borderRadius: BORDERRADIUS.radius_25,
  },
  topSection: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    gap: 21,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: BORDERRADIUS.radius_20,
  },
  descriptionArea: {
    display: "flex",
  },
  coffeeDescription: {
    ...textlightfaint_medium,
    textAlign: "center",
  },
  bottomSection: {
    paddingHorizontal: 17,
    paddingBottom: 15,
    display: "flex",
    gap: 8,
  },
});
