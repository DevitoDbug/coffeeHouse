import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  BORDERRADIUS,
  COLORS,
  textlight_semibold,
} from "../../assets/constants";

export const CreditCard = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit Card</Text>
      <View style={styles.card}>
        <View style={styles.topArea}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_25,
    gap: 10,
  },
  title: {
    ...textlight_semibold,
    fontSize: 14,
  },
  card: {
    height: "80%",
    width: "99%",
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 15,
  },
  topArea: {
    backgroundColor: "blue",
  },
});
