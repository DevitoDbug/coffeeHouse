import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import PaymentScreen from "../screens/PaymentScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import OderHistory from "../screens/OderHistory";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  ProductDetailsScreen: undefined;
  CartScreen: undefined;
  PaymentScreen: undefined;
  FavouritesScreen: undefined;
  OrderHistoryScreen: undefined;
  NotificationsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "default",
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="FavouritesScreen" component={FavouriteScreen} />
      <Stack.Screen name="OrderHistoryScreen" component={OderHistory} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
