import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { CartScreen } from "../screens/CartScreen";
import { PaymentScreen } from "../screens/PaymentScreen";
import { FavouriteScreen } from "../screens/FavouriteScreen";
import { OderHistory } from "../screens/OderHistory";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import {
  BellIcon,
  CartIcon,
  HeartIcon,
  HomeIcon,
} from "../assets/icons/svgIcons";
import { COLORS } from "../assets/constants";
import { BlurView } from "expo-blur";

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
                <HomeIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryOrangeHex}
                />
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
                <CartIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryOrangeHex}
                />
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
                <HeartIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryOrangeHex}
                />
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
                <BellIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryOrangeHex}
                />
              ) : (
                <BellIcon
                  iconWidth={24}
                  iconHeight={24}
                  color={COLORS.primaryWhiteHex}
                />
              );
              break;
          }
          return icon;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={100} style={styles.tabBar} />
        ),
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
      <Tab.Screen name="FavouriteScreen" component={FavouriteScreen} />
      <Tab.Screen name="NotificationScreen" component={OderHistory} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.primaryBlackRGBA,
  },
});
