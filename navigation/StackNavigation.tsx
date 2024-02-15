import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaymentScreen } from "../screens/PaymentScreen";
import { FavouriteScreen } from "../screens/FavouriteScreen";
import { OderHistory } from "../screens/OderHistory";

export type RootStackParamList = {
  PaymentScreen: undefined;
  FavouritesScreen: undefined;
  OrderHistoryScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "ios",
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="FavouritesScreen" component={FavouriteScreen} />
      <Stack.Screen name="OrderHistoryScreen" component={OderHistory} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
