import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigation";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreensNavBar } from "../components/global/ScreensNavBar";
import { BeanItem } from "../components/cart/BeanItem";
import { CoffeeItem } from "../components/cart/CoffeeItem";
import { PayButtonContainer } from "../components/global/PayButtonContainer";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { screenContainer } from "../assets/constants";

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

export const CartScreen = (): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigationToPayment = () => {
    navigation.navigate("PaymentScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNavbar}>
        <BackNavBarWithProfile title="Cart" />
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
        <PayButtonContainer
          totalValue={48.987}
          buttonName="Pay"
          onPressAction={handleNavigationToPayment}
        />
      </View>
      {/* <ScreensNavBar pageName={"CartScreen"} /> */}
    </SafeAreaView>
  );
};

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
