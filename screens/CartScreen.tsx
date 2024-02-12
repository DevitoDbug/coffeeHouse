import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreensNavBar } from "../components/global/ScreensNavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenContainer } from "../assets/images/constants";
import { BeanItem } from "../components/cart/BeanItem";
import { CoffeeItem } from "../components/cart/CoffeeItem";
import { PayContainer } from "../components/cart/PayContainer";
import { BackToPreviousScreenNav } from "../components/cart/NavBar";

export interface CoffeeBeanItemType {
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

export interface CoffeeItemType {
  name: string;
  imageURL: string;
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

const coffeeBeans: CoffeeBeanItemType[] = [
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

const coffeeItems: CoffeeItemType[] = [
  {
    name: "Cappuccino",
    imageURL:
      "https://www.acouplecooks.com/wp-content/uploads/2021/05/Latte-Art-066.jpg",
    description: "With milk and sugar",
    small: {
      price: 10,
      quantity: 3,
    },
    medium: {
      price: 20,
      quantity: 0,
    },
    large: {
      price: 30,
      quantity: 10,
    },
  },
];

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNavbar}>
        <BackToPreviousScreenNav title="Cart" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {coffeeBeans.map((beanItem, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <BeanItem beanItem={beanItem} />
            </View>
          );
        })}
        {coffeeItems.map((coffeeItem, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <CoffeeItem coffeeItem={coffeeItem} />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.payContainer}>
        <PayContainer totalValue={48.987} />
      </View>
      <ScreensNavBar pageName={"CartScreen"} />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    ...screenContainer,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  topNavbar: {
    height: 33,
    marginBottom: 11,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 30,
    display: "flex",
    gap: 16,
  },
  itemContainer: {
    width: "100%",
  },
  payContainer: {
    height: 76,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
});
