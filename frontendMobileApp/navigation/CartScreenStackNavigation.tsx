import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaymentScreen } from "../screens/PaymentScreen";
import { CartScreen } from "../screens/CartScreen";

export type CartStackParamList = {
  CartScreenMain: undefined;
  PaymentScreen: undefined;
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
      <Stack.Screen name="CartScreenMain" component={CartScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
