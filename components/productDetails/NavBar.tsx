import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "../../assets/icons/svgIcons";
import { COLORS } from "../../assets/images/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/Navigation";

export const NavBar = (): JSX.Element => {
  const [liked, setLiked] = useState(false);
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          color={liked ? COLORS.primaryRedHex : COLORS.secondaryLightGreyHex}
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
