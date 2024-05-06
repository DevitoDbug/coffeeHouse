import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BORDERRADIUS, COLORS } from "../../assets/constants";
import { AppIcon } from "../../assets/icons/svgIcons";

export const AppIconWithGradient = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryDarkGreyHex, COLORS.primaryBlackHex]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.appIcon}
      >
        <AppIcon
          color={COLORS.secondaryLightGreyHex}
          iconHeight={14}
          iconWidth={14}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 33,
    height: 33,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    flex: 1,
    width: 33,
    height: 33,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_10,
    borderColor: COLORS.primaryDarkGreyHex,
  },
});
