import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import {
  BORDERRADIUS,
  COLORS,
  SCREENWIDTH,
  colors,
} from "../../assets/images/constants";
import { SearchIcon } from "../../assets/icons/svgIcons";

export const Search = (): JSX.Element => {
  return (
    <View style={styles.searchInputContainer}>
      <SearchIcon color={colors.grey_pale} />
      <TextInput
        placeholder="Find your coffee..."
        placeholderTextColor={colors.grey_pale}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    width: SCREENWIDTH - 60,
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_20,
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 12,
    fontSize: 10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    gap: 19,
  },
  searchInput: {
    color: colors.text_white,
  },
});
