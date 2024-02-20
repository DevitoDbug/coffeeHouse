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
  // dummy data
  const data: OrderItemType[] = [
    {
      id: "1",
      imageURL: "https://via.placeholder.com/150",
      date: "2021-08-01",
      totalAmount: 100,
      items: [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          quantity: 2,
          totalPrice: 20,
          category: "medium",
          product: "coffee",
        },
        {
          id: "2",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          quantity: 5,
          totalPrice: 20,
          category: "large",
          product: "coffee",
        },
        {
          id: "3",
          title: "Item 2",
          description: "Description 2",
          price: 20,
          quantity: 3,
          totalPrice: 60,
          weight: "500g",
          product: "coffee beans",
        },
      ],
    },
    {
      id: "2",
      imageURL: "https://via.placeholder.com/150",
      date: "2021-08-02",
      totalAmount: 200,
      items: [
        {
          id: "3",
          title: "Item 3",
          description: "Description 3",
          price: 30,
          quantity: 4,
          totalPrice: 120,
          category: "large",
          product: "coffee",
        },
        {
          id: "4",
          title: "Item 4",
          description: "Description 4",
          price: 40,
          quantity: 5,
          totalPrice: 200,
          weight: "1kg",
          product: "coffee beans",
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
        <OrderItem items={data} />
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
});
