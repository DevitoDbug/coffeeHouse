import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  container,
} from "../../assets/images/constants";
import { AppIcon } from "../../assets/icons/svgIcons";

export const AppIconWithGradient = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryLightGreyHex, COLORS.primaryBlackRGBA]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.appIcon}
      >
        <AppIcon color={COLORS.secondaryLightGreyHex} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
  },
  appIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
  },
});
