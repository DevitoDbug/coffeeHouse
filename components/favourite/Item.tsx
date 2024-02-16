import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GradientBox } from "../global/GradientBox";
import { TransparentContainer } from "../productDetails/TransparentContainer";
import {
  BORDERRADIUS,
  SCREENHEIGHT,
  SCREENWIDTH,
  textlightfaint_semibold,
  textlight_regular,
  COLORS,
} from "../../assets/constants";
import { HeartIcon } from "../../assets/icons/svgIcons";

export interface FavouriteItem {
  id: number;
  imageURl: string;
  liked: boolean;
  name: string;
  shortDescription: string;
  ratting: number;
  numberOfRattings: number;
  longDescription: string;
}
export interface ItemProp {
  item: FavouriteItem;
}

export const Item = ({ item }: ItemProp): JSX.Element => {
  return (
    <View style={styles.cardContainer}>
      <GradientBox>
        <Image
          source={{
            uri: item.imageURl,
          }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.loveIconContainer}>
          <GradientBox xStyles={styles.loveIcon}>
            <HeartIcon
              color={item.liked ? COLORS.primaryRedHex : COLORS.primaryWhiteHex}
            />
          </GradientBox>
        </TouchableOpacity>
        <View style={styles.transparentContainer}>
          <TransparentContainer />
        </View>
        <View style={styles.descriptionBox}>
          <Text style={{ ...textlightfaint_semibold, fontSize: 14 }}>
            Description
          </Text>
          <Text style={{ ...textlight_regular, fontSize: 12 }}>
            {item.longDescription}
          </Text>
        </View>
      </GradientBox>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: SCREENHEIGHT * 0.6,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  image: {
    position: "relative",
    height: SCREENHEIGHT * 0.43,
    width: SCREENWIDTH - 60,
  },
  loveIconContainer: {
    position: "absolute",
    top: 25,
    right: 20,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    overflow: "hidden",
  },
  loveIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  transparentContainer: {
    position: "absolute",
    height: 133,
    width: SCREENWIDTH - 60,
    top: SCREENHEIGHT * 0.43 - 133,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  descriptionBox: {
    paddingVertical: 16,
    paddingHorizontal: 31,
  },
});
