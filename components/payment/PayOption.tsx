import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { GradientBox } from "../global/GradientBox";
import {
  BORDERRADIUS,
  COLORS,
  textlight_regular,
  textlight_semibold,
} from "../../assets/constants";
import { PickedOptionType } from "../../screens/PaymentScreen";

export interface PayOptionType {
  amount: number;
  onPress: (selectedOption: PickedOptionType) => void;
  svgIcon?: JSX.Element;
  pngIcon?: ImageSourcePropType;
  nameOfPayOption: PickedOptionType;
}

export interface PayOptionProps {
  option: PayOptionType;
  selectedOption: PickedOptionType;
}

export const PayOption = ({
  option,
  selectedOption,
}: PayOptionProps): JSX.Element => {
  return (
    <GradientBox xStyles={styles.payOption}>
      <TouchableOpacity
        onPress={() => option.onPress(option.nameOfPayOption)}
        style={styles.buttonContainer}
      >
        <View style={styles.payOptionLabel}>
          {option.svgIcon ? (
            option.svgIcon
          ) : (
            <Image source={option.pngIcon} style={styles.imageIcon} />
          )}
          <Text style={{ ...textlight_semibold, fontSize: 14 }}>
            {option.nameOfPayOption}
          </Text>
        </View>
        {selectedOption === option.nameOfPayOption && (
          <Text style={styles.payAmount}>$ {option.amount}</Text>
        )}
      </TouchableOpacity>
    </GradientBox>
  );
};

const styles = StyleSheet.create({
  payOption: {
    flex: 1,
    borderRadius: BORDERRADIUS.radius_25,
    borderColor: COLORS.primaryDarkGreyHex,
    borderWidth: 1,
  },
  buttonContainer: {
    paddingHorizontal: 17,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  payOptionLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  payAmount: {
    ...textlight_regular,
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
  },
  imageIcon: {
    width: 25,
    height: 20,
  },
});
