import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS, textLightfaint } from "../../assets/constants";

export interface NavOption {
  title: string;
  active: boolean;
}
interface RenderItemParams {
  item: NavOption;
  index: number;
}
export const Navbar = (): JSX.Element => {
  const [navOptions, setNavOptions] = useState<NavOption[]>([
    {
      title: "All",
      active: true,
    },
    {
      title: "Cappuccino",
      active: false,
    },
    {
      title: "Espresso",
      active: false,
    },
    {
      title: "Latte",
      active: false,
    },
    {
      title: "Filter",
      active: false,
    },
    {
      title: "Iced",
      active: false,
    },
    {
      title: "Decaf",
      active: false,
    },
    {
      title: "Tea",
      active: false,
    },
  ]);
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
  };

  const handleOptionPressed = (index: number) => {
    scrollToIndex(index);
    setNavOptions((prev: NavOption[]) => {
      return prev.map((option, i) => {
        if (i === index) {
          return { ...option, active: true };
        }
        return { ...option, active: false };
      });
    });
  };

  const renderItem = ({ item, index }: RenderItemParams) => {
    return (
      <TouchableOpacity
        onPress={() => handleOptionPressed(index)}
        style={styles.option}
      >
        <Text
          style={[
            styles.optionText,
            item.active
              ? styles.optionTextSelected
              : styles.optionTextNotSelected,
          ]}
        >
          {item.title}
        </Text>
        {item.active && <View style={styles.roundSelector}></View>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navContainer}>
      <FlatList
        ref={flatListRef}
        data={navOptions}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingRight: renderItem.length * 330 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    height: 44,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  option: {
    height: 34,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  optionText: {
    fontSize: 14,
  },
  optionTextSelected: {
    color: COLORS.primaryOrangeHex,
  },
  optionTextNotSelected: {
    ...textLightfaint,
    fontSize: 14,
  },
  contentContainerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  roundSelector: {
    width: 8,
    height: 8,
    borderRadius: 20,
    color: COLORS.primaryOrangeHex,
  },
});
