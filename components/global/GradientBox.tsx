import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../assets/constants";

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
