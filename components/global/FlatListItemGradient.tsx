import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../assets/images/constants";

interface AppIconWithGradientProps {
  children: React.ReactNode;
}

export const FlatlistItemGradient = ({
  children,
}: AppIconWithGradientProps): JSX.Element => {
  return (
    <LinearGradient
      colors={[COLORS.primaryDarkGreyHex, COLORS.primaryBlackHex]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.flatlistItem}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flatlistItem: {
    flex: 1,
    borderRadius: 23,
    padding: 12,
    display: "flex",
    alignItems: "center",
  },
});
