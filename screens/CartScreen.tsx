import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreensNavBar } from "../components/global/ScreensNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenContainer } from "../assets/images/constants";
import { BeanItem } from "../components/cart/BeanItem";

export interface CoffeeBeanItem {
  imageURL: string;
  name: string;
  description: string;
  quantity_250gm: {
    price: number;
    quantity: number;
  };
  quantity_500gm: {
    price: number;
    quantity: number;
  };
  quantity_1000kg: {
    price: number;
    quantity: number;
  };
}

export interface CoffeeItem {
  name: string;
  description: string;
  small: {
    price: number;
    quantity: number;
  };
  medium: {
    price: number;
    quantity: number;
  };
  large: {
    price: number;
    quantity: number;
  };
}

const coffeeBeans: CoffeeBeanItem[] = [
  {
    imageURL:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    name: "Liberica Coffee Beans",
    description: "Medium Roasted",
    quantity_250gm: {
      price: 10,
      quantity: 3,
    },
    quantity_500gm: {
      price: 20,
      quantity: 0,
    },
    quantity_1000kg: {
      price: 30,
      quantity: 10,
    },
  },
];

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {coffeeBeans.map((beanItem, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <BeanItem beanItem={beanItem} />
            </View>
          );
        })}
      </ScrollView>
      <ScreensNavBar pageName={"CartScreen"} />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    ...screenContainer,
    paddingHorizontal: 0,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 30,
    display: "flex",
  },
  itemContainer: {
    width: "100%",
  },
});
