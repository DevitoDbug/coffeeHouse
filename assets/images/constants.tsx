import { Dimensions } from "react-native";

export enum colors {
  text_white = "#FFFFFF",
  primary_bg_dark = "#0C0F14",
  light_faded = "rgba(255, 255, 255, 0.18)",
  dark_blue = "#21262E",
}

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
