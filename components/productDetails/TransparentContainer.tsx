import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { BeanIcon, LocationIcon, StarIcon } from "../../assets/icons/svgIcons";
import {
  COLORS,
  textlight_medium,
  textlight_semibold,
  textlightfaint_regular,
} from "../../assets/images/constants";

export const TransparentContainer = (): JSX.Element => {
  return (
    <BlurView intensity={50} tint="dark" style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
