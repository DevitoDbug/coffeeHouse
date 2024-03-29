import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "../../assets/icons/svgIcons";
import { COLORS } from "../../assets/constants";

export const NavBar = (): JSX.Element => {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack();
  };
  const handleLiked = () => {
    setLiked((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleNavigateBack}
      >
        <ChevronLeftIcon
          iconWidth={8}
          iconHeight={14}
          color={COLORS.primaryLightGreyHex}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLiked}>
        <HeartIcon
          iconWidth={18}
          iconHeight={18}
          color={liked ? COLORS.primaryRedHex : COLORS.primaryWhiteHex}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  buttonContainer: {
    height: 33,
    width: 33,
    padding: 6.6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: COLORS.secondaryDarkGreyHex,
  },
});
