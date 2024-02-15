import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";

export type HomeRootStackParamList = {
  HomeScreenMain: undefined;
  ProductDetailsScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeRootStackParamList>();

export const HomeScreenStackNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "ios",
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen name="HomeScreenMain" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
