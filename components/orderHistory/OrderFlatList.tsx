import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { OrderItem, OrderItemType } from "./OrderItem";
import {
  COLORS,
  SCREENWIDTH,
  textlight_regular,
  textlight_semibold,
} from "../../assets/constants";

export const OrderFlatList = (): JSX.Element => {
  const data: OrderItemType[] = [
    {
      id: "1",
      date: "2021-08-01",
      totalAmount: 100,
      items: [
        {
          id: "1",
          imageURL:
            "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
          title: "Item 1",
          shortDescription: "Description 1",
          largePrice: 10,
          mediumPrice: 8,
          smallPrice: 6,
          totalPrice: 20,
          product: "coffee",
          quantity: {
            small: 2,
            medium: 3,
            large: 4,
          },
        },
        {
          id: "2",
          imageURL:
            "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
          title: "Item 1",
          shortDescription: "Description 1",
          largePrice: 10,
          mediumPrice: 8,
          smallPrice: 6,
          totalPrice: 20,
          product: "coffee",
          quantity: {
            small: 2,
            medium: 3,
            large: 4,
          },
        },
        {
          id: "3",
          imageURL:
            "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
          title: "Item 2",
          shortDescription: "Description 2",
          "250gPrice": 10,
          "500gPrice": 20,
          "1kgPrice": 30,
          totalPrice: 60,
          product: "coffee beans",
          quantity: {
            "250g": 2,
            "500g": 3,
            "1kg": 4,
          },
        },
      ],
    },
    {
      id: "2",
      date: "2021-08-02",
      totalAmount: 200,
      items: [
        {
          id: "3",
          imageURL:
            "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
          title: "Item 3",
          shortDescription: "Description 3",
          largePrice: 10,
          mediumPrice: 8,
          smallPrice: 6,
          totalPrice: 120,
          product: "coffee",
          quantity: {
            small: 2,
            medium: 3,
            large: 4,
          },
        },
        {
          id: "4",
          imageURL:
            "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
          title: "Item 4",
          shortDescription: "Description 4",
          "250gPrice": 10,
          "500gPrice": 20,
          "1kgPrice": 30,
          totalPrice: 200,
          product: "coffee beans",
          quantity: {
            "250g": 2,
            "500g": 3,
            "1kg": 4,
          },
        },
      ],
    },
  ];

  const renderItem = ({ item }: { item: OrderItemType }) => {
    return (
      <View style={styles.orderContainer}>
        <View style={styles.titlesContainer}>
          <View style={styles.dateArea}>
            <Text style={{ ...textlight_semibold, fontSize: 14 }}>
              Order Date
            </Text>
            <Text style={{ ...textlight_regular, fontSize: 14 }}>
              {item.date}
            </Text>
          </View>
          <View>
            <Text style={{ ...textlight_semibold, fontSize: 14 }}>
              Total Amount
            </Text>
            <Text
              style={{
                ...textlight_regular,
                fontSize: 14,
                color: COLORS.primaryOrangeHex,
              }}
            >
              $ {item.totalAmount}
            </Text>
          </View>
        </View>
        <OrderItem orderItem={item} />
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    width: SCREENWIDTH - 60,
  },
  titlesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateArea: {
    display: "flex",
  },
  flatListContainer: {
    marginTop: 25,
    paddingBottom: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
});
