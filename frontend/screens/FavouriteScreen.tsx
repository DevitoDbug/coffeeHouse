import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FavouriteItemDummyData } from "../store/dummyData";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { FavouriteItem, Item } from "../components/favourite/Item";
import { screenContainer } from "../assets/constants";

const favouriteItemDummyData = FavouriteItemDummyData;

export const FavouriteScreen = (): JSX.Element => {
  const renderItem = ({ item }: { item: FavouriteItem }) => {
    return (
      <View>
        <Item item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.navBar}>
        <BackNavBarWithProfile title="Favorites" />
      </View>
      <View style={styles.screenBody}>
        <FlatList
          data={favouriteItemDummyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    flex: 1,
    paddingHorizontal: 30,
  },
  flatListContainer: {
    display: "flex",
    gap: 28,
    paddingBottom: 70,
  },
});
