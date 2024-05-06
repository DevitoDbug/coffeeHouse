import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  BORDERRADIUS,
  COLORS,
  textlight_semibold,
} from "../../assets/constants";
import { CreditCardChipIcon, VisaIcon } from "../../assets/icons/svgIcons";
import { GradientBox } from "../global/GradientBox";

export const CreditCard = ({
  creditCarNumber = "3  8  9  7     8  9  2  3     6  7  4  5     4  6  3  8",
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Credit Card</Text>
      <GradientBox xStyles={styles.card}>
        <View style={styles.topArea}>
          <CreditCardChipIcon
            iconHeight={31}
            iconWidth={24}
            color={COLORS.primaryOrangeHex}
          />
          <VisaIcon iconWidth={50} iconHeight={16.5} />
        </View>
        <View style={styles.middleSection}>
          <Text style={styles.cardNumber}>{creditCarNumber}</Text>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.bottomTextBox}>
            <Text style={styles.fadedText}>Card Holder Name</Text>
            <Text style={styles.bolderText}>John Doe</Text>
          </View>
          <View style={styles.bottomTextBox}>
            <Text style={styles.fadedText}>Expiry Date</Text>
            <Text style={{ ...styles.bolderText, textAlign: "right" }}>
              12/25
            </Text>
          </View>
        </View>
      </GradientBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_25,
    gap: 10,
  },
  title: {
    ...textlight_semibold,
    fontSize: 14,
  },
  card: {
    width: "99%",
    alignSelf: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    paddingVertical: 15,
  },
  topArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  middleSection: {
    paddingLeft: 10,
  },
  cardNumber: {
    ...textlight_semibold,
    fontSize: 14,
  },
  bottomSection: {
    display: "flex",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomTextBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fadedText: {
    ...textlight_semibold,
    fontSize: 10,
    color: COLORS.primaryLightGreyHex,
  },
  bolderText: {
    ...textlight_semibold,
    fontSize: 12,
  },
});
