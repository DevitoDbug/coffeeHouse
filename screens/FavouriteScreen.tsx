import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BORDERRADIUS,
  SCREENHEIGHT,
  SCREENWIDTH,
  screenContainer,
  textlight_regular,
  textlightfaint_semibold,
} from "../assets/constants";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { TransparentContainer } from "../components/productDetails/TransparentContainer";
import { GradientBox } from "../components/global/GradientBox";

export const FavouriteScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.navBar}>
        <BackNavBarWithProfile title="Favorites" />
      </View>
      <View style={styles.screenBody}>
        <View style={styles.cardContainer}>
          <GradientBox>
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
              }}
              style={styles.image}
            />
            <View style={styles.transparentContainer}>
              <TransparentContainer />
            </View>
            <View style={styles.descriptionBox}>
              <Text style={{ ...textlightfaint_semibold, fontSize: 14 }}>
                Description
              </Text>
              <Text style={{ ...textlight_regular, fontSize: 12 }}>
                Cappuccino is a latte made with more foam than steamed milk,
                often with a sprinkle of cocoa powder or cinnamon on top.
              </Text>
            </View>
          </GradientBox>
        </View>
      </View>

      <Text>FavouriteScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
    paddingHorizontal: 0,
  },
  navBar: {
    height: 33,
    marginBottom: 20,
  },
  screenBody: {
    paddingHorizontal: 30,
  },
  cardContainer: {
    height: SCREENHEIGHT * 0.6,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  image: {
    position: "relative",
    height: SCREENHEIGHT * 0.43,
    width: SCREENWIDTH - 60,
  },
  transparentContainer: {
    position: "absolute",
    height: 133,
    width: SCREENWIDTH - 60,
    top: SCREENHEIGHT * 0.43 - 133,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  descriptionBox: {
    paddingVertical: 16,
    paddingHorizontal: 31,
  },
});
