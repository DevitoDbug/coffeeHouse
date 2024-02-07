import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { BeanDetailScreen } from "../screens/BeanDetailScreen";
import CoffeeDetailScreen from "../screens/CoffeeDetailScreen";
import CartScreen from "../screens/CartScreen";
import PaymentScreen from "../screens/PaymentScreen";
import FavouriteScreen from "../screens/FavouriteScreen";

export type RootStackParamList = {
  HomeScreen: undefined;
  BeanDetailScreen: undefined;
  CoffeeDetailScreen: undefined;
  CartScreen: undefined;
  PaymentScreen: undefined;
  Favourite: undefined;
  OrderHistoryScreen: undefined;
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
      <Stack.Screen name="BeanDetailScreen" component={BeanDetailScreen} />
      <Stack.Screen name="CoffeeDetailScreen" component={CoffeeDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="Favourite" component={FavouriteScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});