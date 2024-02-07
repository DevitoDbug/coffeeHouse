import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AppIconWithGradientProps {
  children: React.ReactNode;
}

export const FlatlistItemGradient = ({
  children,
}: AppIconWithGradientProps): JSX.Element => {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.18)", "#262B33"]}
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
// <linearGradient
//   id="paint0_linear_12_747"
//   x1="6.25573"
//   y1="9.63448"
//   x2="142.137"
//   y2="222.55"
//   gradientUnits="userSpaceOnUse"
// >
//   <stop stop-color="#262B33" />
//   <stop offset="1" stop-color="#262B33" stop-opacity="0" />
// </linearGradient>;
