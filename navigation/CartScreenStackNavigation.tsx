import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaymentScreen } from "../screens/PaymentScreen";
import { CartScreen } from "../screens/CartScreen";

export type CartStackParamList = {
  PaymentScreen: undefined;
  CartScreen: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

export const CartScreenStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "ios",
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
