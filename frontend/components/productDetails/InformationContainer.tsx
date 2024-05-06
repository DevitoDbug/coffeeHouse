import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  textlight_regular,
  textlight_semibold,
  textlightfaint_medium,
} from "../../assets/constants";
import { HomeStackParamList } from "../../navigation/HomeScreenStackNavigation";

export const InformationContainer = (): JSX.Element => {
  const navigation: NativeStackNavigationProp<HomeStackParamList> =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleNavigateHome = () => {
    navigation.navigate("HomeScreenMain");
  };
  return (
    <View style={styles.bottomContainer}>
      <Text
        style={{
          ...textlight_semibold,
          fontSize: 14,
          marginTop: 19,
          marginBottom: 15,
          color: COLORS.secondaryLightGreyHex,
        }}
      >
        Description
      </Text>
      <Text
        style={{
          ...textlight_regular,
          fontSize: FONTSIZE.size_12,
          marginBottom: 8,
        }}
      >
        Arabica beans are by far the most popular type of coffee beans, making
        up about 60% of the world’s coffee. These tasty beans originated many
        centuries ago in the highlands of Ethiopia, and may even be the first
        coffee beans ever consumed!
      </Text>
      <Text
        style={{
          ...textlight_semibold,
          fontSize: 14,
          marginTop: 8,
          marginBottom: 12,
          color: COLORS.secondaryLightGreyHex,
        }}
      >
        Size
      </Text>
      <View style={styles.sizeContainer}>
        <TouchableOpacity style={[styles.size, styles.selectedSize]}>
          <Text
            style={[
              textlightfaint_medium,
              styles.selectedSizeText,
              { fontSize: 12 },
            ]}
          >
            250gm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.size}>
          <Text style={{ ...textlightfaint_medium, fontSize: 12 }}>500gm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.size}>
          <Text style={{ ...textlightfaint_medium, fontSize: 12 }}>1000gm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceArea}>
        <View style={{ display: "flex", gap: 3 }}>
          <Text
            style={{
              ...textlightfaint_medium,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            Price
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{
                ...textlight_semibold,
                fontSize: 20,
                color: COLORS.primaryOrangeHex,
              }}
            >
              $
            </Text>
            <Text style={{ ...textlight_semibold, fontSize: 20 }}> 25.00</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleNavigateHome}
        >
          <Text
            style={{
              ...textlight_semibold,
              fontSize: 16,
            }}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: 18,
  },
  sizeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  size: {
    width: 100,
    height: 40,
    borderRadius: BORDERRADIUS.radius_10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  selectedSize: {
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
  },
  selectedSizeText: {
    color: COLORS.primaryOrangeHex,
  },
  priceArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    width: 240,
    height: 60,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
