import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { COLORS, SCREENHEIGHT, SCREENWIDTH } from "../assets/images/constants";
import { TransparentContainer } from "../components/productDetails/TransparentContainer";
import { InformationContainer } from "../components/productDetails/InformationContainer";

export const ProductDetailsScreen = (): JSX.Element => {
  return (
    <View style={styles.screenContainer}>
      <Image
        source={{
          uri: "https://majestycoffee.com/cdn/shop/articles/coffee_beans_4.jpg?v=1683532226",
        }}
        style={styles.image}
      />

      <View style={styles.imageOverViewContainer}>
        <TransparentContainer />
      </View>
      <View>
        <InformationContainer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  image: {
    position: "relative",
    height: SCREENHEIGHT * 0.584,
    width: SCREENWIDTH,
  },
  imageOverViewContainer: {
    position: "absolute",
    top: SCREENHEIGHT * 0.584 - 148,
    height: 148,
    width: SCREENWIDTH,
  },
});
