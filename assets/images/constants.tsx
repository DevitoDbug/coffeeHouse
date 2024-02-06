import { Dimensions } from "react-native";

export enum colors {
  text_white = "#FFFFFF",
  primary_bg_dark = "#0C0F14",
  primary_bg_dark_pale = "#141921",
  light_faded = "rgba(255, 255, 255, 0.18)",
  dark_blue = "#21262E",
  grey_pale = "#52555A",
}

export const fonts = {
  poppins_medium: "Poppins-medium",
  poppins_semiBold: "poppins-semiBold",
};

export const boldTitles = {
  fontSize: 24,
  fontFamily: fonts.poppins_semiBold,
  color: colors.text_white,
};

export const container = {
  flex: 1,
  paddingTop: 19.9,
  paddingBottom: 9,
  paddingHorizontal: 30,
  backgroundColor: colors.primary_bg_dark,
};

// we need screen width and height to make the app responsive
export const { width: SCREENWIDTH, height: SCREENHEIGHT } =
  Dimensions.get("window");
