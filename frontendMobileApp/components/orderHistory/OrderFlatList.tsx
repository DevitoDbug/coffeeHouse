import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { OrderItem, OrderItemType } from "./OrderItem";
import { OrderItemDummyData } from "../../store/dummyData";
import {
  COLORS,
  SCREENWIDTH,
  textlight_regular,
  textlight_semibold,
} from "../../assets/constants";

export const OrderFlatList = (): JSX.Element => {
  const orderItemDummyData = OrderItemDummyData;

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
      data={orderItemDummyData}
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
