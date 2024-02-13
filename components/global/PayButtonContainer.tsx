import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  textlightfaint_medium,
  textlight_medium,
  textlight_semibold,
} from "../../assets/constants";

export interface PayContainerProps {
  totalValue: number;
  buttonName: string;
  onPressAction: () => void;
}

export const PayButtonContainer = ({
  totalValue,
  buttonName,
  onPressAction,
}: PayContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalValueBox}>
        <Text style={{ ...textlightfaint_medium, fontSize: 12 }}>
          Total Price
        </Text>
        <Text style={styles.priceValue}>
          <Text style={{ color: COLORS.primaryOrangeHex }}>$ </Text>
          {totalValue.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={onPressAction}>
        <Text style={{ ...textlight_medium, fontSize: 16 }}>{buttonName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalValueBox: {
    height: "60%",
    display: "flex",
  },
  priceValue: {
    ...textlight_semibold,
    fontSize: 20,
  },
  payButton: {
    height: 60,
    width: 240,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryOrangeHex,
  },
});
