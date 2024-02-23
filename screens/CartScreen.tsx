import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartStackParamList } from "../navigation/CartScreenStackNavigation";
import { CoffeeBeansCartItems, CoffeeCartItems } from "../store/dummyData";
import { BeanItem } from "../components/cart/BeanItem";
import { CoffeeItem } from "../components/cart/CoffeeItem";
import { PayButtonContainer } from "../components/global/PayButtonContainer";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { screenContainer } from "../assets/constants";

export interface CoffeeBeanCartItemType {
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

export interface CoffeeCartItemType {
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

const coffeeBeansItems = CoffeeBeansCartItems;

const coffeeItems = CoffeeCartItems;

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const CartScreen = (): JSX.Element => {
  const navigation: NativeStackNavigationProp<CartStackParamList> =
    useNavigation<NativeStackNavigationProp<CartStackParamList>>();

  const handleNavigationToPayment = () => {
    navigation.navigate("PaymentScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNavbar}>
        <BackNavBarWithProfile title="Cart" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {coffeeBeansItems.map((beanItem, index) => {
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
        <PayButtonContainer
          totalValue={48.987}
          buttonName="Pay"
          onPressAction={handleNavigationToPayment}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...screenContainer,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingBottom: 50,
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
