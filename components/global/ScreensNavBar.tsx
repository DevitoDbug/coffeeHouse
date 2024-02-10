import { StyleSheet, Platform, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS, SCREENWIDTH } from "../../assets/images/constants";
import {
  BellIcon,
  CartIcon,
  HeartIcon,
  HomeIcon,
} from "../../assets/icons/svgIcons";

export type PageNames = "Home" | "Cart" | "Liked" | "Notifications";

export interface ScreensNavBarProps {
  pageName: PageNames;
}

export const ScreensNavBar = ({
  pageName,
}: ScreensNavBarProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={pageName === "Home" ? styles.glowButton : styles.doNotGlow}
        >
          <HomeIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "Home"
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={pageName === "Cart" ? styles.glowButton : {}}>
          <CartIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "Cart"
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={pageName === "Liked" ? styles.glowButton : {}}>
          <HeartIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "Liked"
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={pageName === "Notifications" ? styles.glowButton : {}}
        >
          <BellIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "Notifications"
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREENWIDTH,
    height: 55,
    paddingHorizontal: 30,
    backgroundColor: COLORS.primaryBlackRGBA,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 75,
  },
  glowButton: {
    backgroundColor: COLORS.lightOrange,
    borderRadius: 100,
    width: 15,
    height: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primaryBlackRGBA,
    elevation: 100,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.8,
        shadowRadius: 6,
      },
      android: {
        shadowColor: COLORS.primaryOrangeHex,
        elevation: 20,
      },
    }),
  },
  doNotGlow: {
    shadowColor: "none",
  },
});
