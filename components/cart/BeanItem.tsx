import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { CoffeeBeanItem } from "../../screens/CartScreen";
import { BORDERRADIUS, COLORS } from "../../assets/images/constants";
import {
  textlight_regular,
  textlightfaint_medium,
} from "../../assets/images/constants";
import { GradientBox } from "../global/GradientBox";
import { QuantityPicker } from "./QuantityPicker";

interface BeanItemProps {
  beanItem: CoffeeBeanItem;
}

export const BeanItem = ({ beanItem }: BeanItemProps): JSX.Element => {
  return (
    <GradientBox xStyles={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={{ uri: beanItem.imageURL }}
          style={styles.imageContainer}
        />
        <View style={styles.descriptionArea}>
          <Text
            style={{ ...textlight_regular, fontSize: 16, marginBottom: 10 }}
          >
            {beanItem.name}
          </Text>
          <Text style={styles.beanDescription}>{beanItem.description}</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        {beanItem.quantity_250gm && (
          <QuantityPicker
            initialQuantity={beanItem.quantity_250gm.quantity}
            letterRef="250gm"
            price={beanItem.quantity_250gm.price}
          />
        )}
        {beanItem.quantity_500gm && (
          <QuantityPicker
            initialQuantity={beanItem.quantity_500gm.quantity}
            letterRef="500gm"
            price={beanItem.quantity_500gm.price}
          />
        )}
        {beanItem.quantity_1000kg && (
          <QuantityPicker
            initialQuantity={beanItem.quantity_1000kg.quantity}
            letterRef="1000kg"
            price={beanItem.quantity_1000kg.price}
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
  beanDescription: {
    ...textlightfaint_medium,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  bottomSection: {
    paddingHorizontal: 17,
    paddingBottom: 15,
    display: "flex",
    gap: 8,
  },
});
