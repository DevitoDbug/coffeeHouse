import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { COLORS } from "../../assets/constants";
import { LinearGradient } from "expo-linear-gradient";

export interface GradientBox {
  children: ReactNode;
  xStyles?: {};
}
export const GradientBox = ({
  children,
  xStyles,
}: GradientBox): JSX.Element => {
  return (
    <LinearGradient
      colors={[COLORS.primaryDarkGreyHex, COLORS.primaryBlackHex]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, xStyles]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
