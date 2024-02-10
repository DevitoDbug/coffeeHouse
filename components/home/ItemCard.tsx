import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatlistItemGradient } from "../global/FlatListItemGradient";
import { CoffeeType } from "./CoffeeTypesFlatList";
import { RootStackParamList } from "../../navigation/Navigation";
import {
  COLORS,
  textlight_semibold,
  textlight_regular,
} from "../../assets/images/constants";
import { PlusIcon, StarIcon } from "../../assets/icons/svgIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface ItemCardProps {
  coffee: CoffeeType;
}

export const ItemCard = ({
  image,
  name,
  description,
  cost,
  ratting,
}: CoffeeType) => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigateToDetails = () => {
    navigation.navigate("ProductDetailsScreen");
  };

  return (
    <View style={styles.coffeeContainer}>
      <FlatlistItemGradient>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <View style={styles.reviewSticker}>
          <StarIcon
            iconWidth={10}
            iconHeight={10}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={textlight_semibold}>{ratting.toString()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ ...textlight_regular, fontSize: 13, marginBottom: 1 }}>
            {name}
          </Text>
          <Text style={{ ...textlight_regular, fontSize: 9 }}>
            {description}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ ...textlight_semibold, fontSize: 15, marginBottom: 6.3 }}
            >
              <Text style={{ color: COLORS.primaryOrangeHex }}>$ </Text>
              {cost}
            </Text>
            <TouchableOpacity
              onPress={handleNavigateToDetails}
              style={styles.plusButton}
            >
              <PlusIcon iconWidth={8} iconHeight={8} />
            </TouchableOpacity>
          </View>
        </View>
      </FlatlistItemGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  coffeeContainer: {
    height: 246,
    width: 149,
    borderRadius: 23,
    display: "flex",
  },
  image: {
    position: "relative",
    width: 126,
    height: 126,
    borderRadius: 11,
    marginBottom: 9.8,
  },
  textContainer: {
    width: 126,
    padding: 0,
  },
  plusButton: {
    width: 28.5,
    height: 28.5,
    borderRadius: 7,
    backgroundColor: COLORS.primaryOrangeHex,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewSticker: {
    position: "absolute",
    top: 12,
    right: 11,
    width: 53,
    height: 22,
    borderTopRightRadius: 44,
    borderBottomLeftRadius: 100,
    backgroundColor: COLORS.secondaryBlackRGBA,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    zIndex: 1,
  },
});