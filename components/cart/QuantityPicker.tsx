import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  BORDERRADIUS,
  COLORS,
  textlight_semibold,
} from "../../assets/images/constants";
import { MinusIcon, PlusIcon } from "../../assets/icons/svgIcons";

export interface QuantityPickerProps {
  letterRef: string;
  initialQuantity: number;
  price: number;
}

export const QuantityPicker = ({
  initialQuantity,
  letterRef,
  price,
}: QuantityPickerProps): JSX.Element => {
  const [newQuantity, setNewQuantity] = useState<number>(initialQuantity);

  const handleIncrementQuantity = () => {
    setNewQuantity((prev) => {
      if (prev >= 0) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };
  const handleDecrementQuantity = () => {
    setNewQuantity((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quanitiyLabel}>{letterRef}</Text>
      <Text style={styles.priceValue}>
        <Text style={{ color: COLORS.primaryOrangeHex }}>$ </Text>
        {price}
      </Text>
      <View style={styles.counter}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={handleDecrementQuantity}
        >
          <MinusIcon iconWidth={8} />
        </TouchableOpacity>
        <Text style={[styles.couterText, styles.quantityValueBox]}>
          {newQuantity}
        </Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={handleIncrementQuantity}
        >
          <PlusIcon iconHeight={8} iconWidth={8} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  quanitiyLabel: {
    width: 75,
    height: 35,
    textAlignVertical: "center",
    textAlign: "center",
    color: COLORS.secondaryLightGreyHex,
    backgroundColor: COLORS.primaryBlackHex,
    fontSize: 10,
    borderRadius: BORDERRADIUS.radius_10,
  },
  priceValue: {
    ...textlight_semibold,
    fontSize: 16,
    width: 49,
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  counterButton: {
    width: 28,
    height: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_8,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  couterText: {
    ...textlight_semibold,
    fontSize: 16,
    textAlignVertical: "center",
    textAlign: "center",
  },
  quantityValueBox: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_8,
    borderColor: COLORS.primaryOrangeHex,
    textAlignVertical: "center",
    textAlign: "center",
  },
});
