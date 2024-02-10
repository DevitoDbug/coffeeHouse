import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  SCREENHEIGHT,
  SCREENWIDTH,
  screenContainer,
  textLightfaint,
  textlight_medium,
  textlight_regular,
  textlight_semibold,
  textlightfaint_medium,
  textlightfaint_regular,
} from "../assets/images/constants";
import { BlurView } from "expo-blur";
import { BeanIcon, LocationIcon, StarIcon } from "../assets/icons/svgIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const ProductDetailsScreen = (): JSX.Element => {
  return (
    <View style={styles.screenContainer}>
      <Image
        source={{
          uri: "https://majestycoffee.com/cdn/shop/articles/coffee_beans_4.jpg?v=1683532226",
        }}
        style={styles.image}
      />
      <BlurView
        intensity={50}
        tint="dark"
        style={styles.imageOverViewContainer}
      >
        <View style={{ display: "flex", gap: 26 }}>
          <View style={{ display: "flex", gap: 2 }}>
            <Text style={{ ...textlight_semibold, fontSize: 20 }}>
              Coffee Beans
            </Text>
            <Text
              style={{
                ...textlightfaint_regular,
                color: COLORS.secondaryLightGreyHex,
                fontSize: 12,
              }}
            >
              From Africa
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <StarIcon
              iconWidth={22.9}
              iconHeight={22.9}
              color={COLORS.primaryOrangeHex}
            />
            <Text
              style={{
                ...textlight_semibold,
                fontSize: 16,
                marginRight: 3,
                marginLeft: 5,
              }}
            >
              4.9
            </Text>
            <Text
              style={{
                ...textlightfaint_regular,
                color: COLORS.secondaryLightGreyHex,
                fontSize: 10,
              }}
            >
              (6,879)
            </Text>
          </View>
        </View>
        <View style={{ display: "flex", gap: 13 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.iconContainer}>
              <BeanIcon
                iconWidth={22}
                iconHeight={22}
                color={COLORS.primaryOrangeHex}
              />
              <Text
                style={{
                  ...textlight_medium,
                  color: COLORS.secondaryLightGreyHex,
                }}
              >
                Bean
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <LocationIcon
                iconWidth={24}
                iconHeight={24}
                color={COLORS.primaryOrangeHex}
              />
              <Text
                style={{
                  ...textlight_medium,
                  color: COLORS.secondaryLightGreyHex,
                }}
              >
                Africa
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.primaryDarkGreyHex,
              height: 45,
              width: 131,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...textlight_medium,
                color: COLORS.secondaryLightGreyHex,
              }}
            >
              Medium Roasted
            </Text>
          </View>
        </View>
      </BlurView>

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
            <Text style={{ ...textlightfaint_medium, fontSize: 12 }}>
              500gm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.size}>
            <Text style={{ ...textlightfaint_medium, fontSize: 12 }}>
              1000gm
            </Text>
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
              <Text style={{ ...textlight_semibold, fontSize: 20 }}>
                {" "}
                25.00
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primaryOrangeHex,
              width: 240,
              height: 60,
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
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
    paddingTop: 31,
    paddingBottom: 16,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Platform.select({
      ios: {},
      android: {
        backgroundColor: COLORS.primaryBlackRGBA,
      },
    }),
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
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
});
