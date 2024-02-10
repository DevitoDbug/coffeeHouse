import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import {
  BORDERRADIUS,
  COLORS,
  SCREENWIDTH,
  colors,
  textlight_semibold,
  textlight_medium,
} from "../../assets/images/constants";
import { SearchIcon } from "../../assets/icons/svgIcons";

export const Search = (): JSX.Element => {
  const [searchActive, setSearchActive] = useState(false);

  const toggleSearch = (flag: boolean) => {
    setSearchActive(flag);
  };
  return (
    <View style={styles.searchInputContainer}>
      <SearchIcon
        color={
          searchActive ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
        }
      />
      <TextInput
        placeholder="Find your coffee..."
        placeholderTextColor={colors.grey_pale}
        style={styles.searchInput}
        onFocus={() => toggleSearch(true)}
        onBlur={() => toggleSearch(false)}
      ></TextInput>
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
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 12,
    fontSize: 10,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    gap: 19,
  },
  searchInput: {
    ...textlight_medium,
    flex: 1,
  },
});
