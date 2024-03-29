import { Dimensions } from "react-native";

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
}

interface Color {
  primaryRedHex: string;
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
  lightOrangeRGBA: string;
}

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const { width: SCREENWIDTH, height: SCREENHEIGHT } =
  Dimensions.get("window");

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
};

export const COLORS: Color = {
  primaryRedHex: "#DC3535",
  primaryOrangeHex: "#D17842",
  primaryBlackHex: "#0C0F14",
  primaryDarkGreyHex: "#141921",
  secondaryDarkGreyHex: "#21262E",
  primaryGreyHex: "#252A32",
  secondaryGreyHex: "#252A32",
  primaryLightGreyHex: "#52555A",
  secondaryLightGreyHex: "#AEAEAE",
  primaryWhiteHex: "#FFFFFF",

  primaryBlackRGBA: "rgba(12,15,20,0.5)",
  secondaryBlackRGBA: "rgba(0,0,0,0.7)",
  lightOrangeRGBA: "rgba(209, 120, 66, 0.4)",
};

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
};

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};

export const screenContainer = {
  flex: 1,
  paddingTop: 19.9,
  paddingBottom: 9,
  paddingHorizontal: 30,
  backgroundColor: COLORS.primaryBlackHex,
};

export const textlight_medium = {
  fontSize: FONTSIZE.size_10,
  fontFamily: "poppins-medium",
  color: COLORS.primaryWhiteHex,
};

export const textlightfaint_medium = {
  ...textlight_medium,
  color: COLORS.primaryLightGreyHex,
};

export const textlight_regular = {
  ...textlight_medium,
  fontFamily: "poppins-regular",
};
export const textlightfaint_regular = {
  ...textlight_regular,
  color: COLORS.primaryLightGreyHex,
};

export const textlight_semibold = {
  ...textlight_medium,
  fontFamily: "poppins-semibold",
};

export const textlightfaint_semibold = {
  ...textlight_semibold,
  color: COLORS.primaryLightGreyHex,
};

export const textbold = {
  ...textlight_semibold,
  fontFamily: "poppins-bold",
  fontSize: FONTSIZE.size_20,
};
