import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { FavouriteScreen } from "../screens/FavouriteScreen";
import { OderHistory } from "../screens/OderHistory";
import {
  BellIcon,
  CartIcon,
  HeartIcon,
  HomeIcon,
} from "../assets/icons/svgIcons";
import { COLORS } from "../assets/constants";
import { HomeScreenStackNavigation } from "./HomeScreenStackNavigation";
import { CartScreenStackNavigation } from "./CartScreenStackNavigation";

export type TabNavigationParamList = {
  HomeScreen: undefined;
  CartScreen: undefined;
  FavouriteScreen: undefined;
  NotificationScreen: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

export const TabNavigation = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon: JSX.Element;
          let routeName: keyof TabNavigationParamList = route.name;
          switch (routeName) {
            case "HomeScreen":
              icon = focused ? (
                <Text style={styles.glowIcon}>
                  <HomeIcon
                    iconWidth={24}
                    iconHeight={24}
                    color={COLORS.primaryOrangeHex}
                  />
                </Text>
              ) : (
                <HomeIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryWhiteHex}
                />
              );
              break;
            case "CartScreen":
              icon = focused ? (
                <Text style={styles.glowIcon}>
                  <CartIcon
                    iconWidth={24}
                    iconHeight={24}
                    color={COLORS.primaryOrangeHex}
                  />
                </Text>
              ) : (
                <CartIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryWhiteHex}
                />
              );
              break;
            case "FavouriteScreen":
              icon = focused ? (
                <Text style={styles.glowIcon}>
                  <HeartIcon
                    iconWidth={24}
                    iconHeight={24}
                    color={COLORS.primaryOrangeHex}
                  />
                </Text>
              ) : (
                <HeartIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryWhiteHex}
                />
              );
              break;
            case "NotificationScreen":
              icon = focused ? (
                <Text style={styles.glowIcon}>
                  <BellIcon
                    iconWidth={24}
                    iconHeight={24}
                    color={COLORS.primaryOrangeHex}
                  />
                </Text>
              ) : (
                <BellIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryWhiteHex}
                />
              );
              break;
            default:
              return;
          }
          return icon;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={100} style={{ backgroundColor: "red" }} />
        ),
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreenStackNavigation} />
      <Tab.Screen name="CartScreen" component={CartScreenStackNavigation} />
      <Tab.Screen name="FavouriteScreen" component={FavouriteScreen} />
      <Tab.Screen name="NotificationScreen" component={OderHistory} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    shadowColor: "transparent",
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  glowIcon: {
    backgroundColor: "transparent",
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    shadowColor: COLORS.primaryOrangeHex,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.8,
        shadowRadius: 6,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
