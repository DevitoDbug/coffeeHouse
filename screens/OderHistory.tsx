import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BORDERRADIUS,
  COLORS,
  SCREENWIDTH,
  screenContainer,
  textlight_semibold,
} from "../assets/constants";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";

export const OderHistory = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.navBar}>
        <BackNavBarWithProfile title="Oder History" />
      </View>
      <View style={styles.flatListArea}>
        <Text style={{ ...textlight_semibold, fontSize: 16 }}>
          Oder History
        </Text>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={{ ...textlight_semibold, fontSize: 16 }}>Download</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
    paddingHorizontal: 0,
  },
  navBar: {
    width: "100%",
    height: 30,
  },
  flatListArea: {
    flex: 1,
    backgroundColor: "red",
  },
  downloadButton: {
    width: SCREENWIDTH - 60,
    height: 60,
    marginHorizontal: 50,
    marginBottom: 60,
    marginVertical: 20,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
