import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../assets/images/constants";

interface AppIconWithGradientProps {
  children: React.ReactNode;
}

export const AppIconWithGradient = ({
  children,
}: AppIconWithGradientProps): JSX.Element => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.18)", "#0C0F14"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.4, y: 0.8 }}
      style={styles.appIcon}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  appIcon: {
    padding: 8,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
