import { StyleSheet, Platform, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS, SCREENWIDTH } from "../../assets/constants";
import {
  BellIcon,
  CartIcon,
  HeartIcon,
  HomeIcon,
} from "../../assets/icons/svgIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";

export type PageNames =
  | "HomeScreen"
  | "CartScreen"
  | "FavouritesScreen"
  | "NotificationsScreen";

export interface ScreensNavBarProps {
  pageName: PageNames;
}

export const ScreensNavBar = ({
  pageName,
}: ScreensNavBarProps): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigation = (pageName: PageNames) => {
    switch (pageName) {
      case "HomeScreen":
        navigation.navigate("HomeScreen");
        break;
      case "CartScreen":
        navigation.navigate("CartScreen");
        break;
      case "FavouritesScreen":
        navigation.navigate("FavouritesScreen");
        break;
      case "NotificationsScreen":
        navigation.navigate("OrderHistoryScreen");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleNavigation("HomeScreen");
          }}
          style={
            pageName === "HomeScreen" ? styles.glowButton : styles.doNotGlow
          }
        >
          <HomeIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "HomeScreen"
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleNavigation("CartScreen");
          }}
          style={
            pageName === "CartScreen" ? styles.glowButton : styles.doNotGlow
          }
        >
          <CartIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "CartScreen"
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleNavigation("FavouritesScreen");
          }}
          style={
            pageName === "FavouritesScreen"
              ? styles.glowButton
              : styles.doNotGlow
          }
        >
          <HeartIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "FavouritesScreen"
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleNavigation("NotificationsScreen");
          }}
          style={
            pageName === "NotificationsScreen"
              ? styles.glowButton
              : styles.doNotGlow
          }
        >
          <BellIcon
            iconWidth={24}
            iconHeight={24}
            color={
              pageName === "NotificationsScreen"
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
    backgroundColor: "transparent",
    borderRadius: 100,
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primaryBlackRGBA,
    elevation: 10,
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
