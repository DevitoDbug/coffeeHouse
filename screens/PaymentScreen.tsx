import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartStackParamList } from "../navigation/CartScreenStackNavigation";
import { TabNavigationParamList } from "../navigation/TabNavigation";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { PayButtonContainer } from "../components/global/PayButtonContainer";
import { CreditCard } from "../components/payment/CreditCard";
import { PayOption, PayOptionType } from "../components/payment/PayOption";
import {
  COLORS,
  SCREENHEIGHT,
  SCREENWIDTH,
  screenContainer,
} from "../assets/constants";
import { AppleIcon, WalletIcon } from "../assets/icons/svgIcons";

const GooglePayIcon = require("../assets/icons/googlePay.png");
const AmazonPay = require("../assets/icons/amazonPay.png");
export type PickedOptionType =
  | "Wallet"
  | "Google Pay"
  | "Apple Pay"
  | "Amazon Pay";

export const PaymentScreen = (): JSX.Element => {
  const navigation: NativeStackNavigationProp<TabNavigationParamList> =
    useNavigation<NativeStackNavigationProp<TabNavigationParamList>>();
  const [pickedPayOption, setPickedPayOption] =
    useState<PickedOptionType>("Wallet");
  const stackNavitaion: NativeStackNavigationProp<CartStackParamList> =
    useNavigation<NativeStackNavigationProp<CartStackParamList>>();

  const handlePayment = () => {
    stackNavitaion.reset({
      index: 0,
      routes: [{ name: "CartScreenMain" }],
    });
    navigation.navigate("HomeScreen");
  };

  const handleSetSelectedPayOption = (selectedOption: PickedOptionType) => {
    setPickedPayOption(selectedOption);
  };

  const payOptions: PayOptionType[] = [
    {
      svgIcon: (
        <WalletIcon
          iconHeight={20}
          iconWidth={25}
          color={
            pickedPayOption === "Wallet" ? COLORS.primaryOrangeHex : "white"
          }
        />
      ),
      amount: 100.5,
      onPress: handleSetSelectedPayOption,
      nameOfPayOption: "Wallet",
    },
    {
      pngIcon: GooglePayIcon,
      amount: 100.5,
      onPress: handleSetSelectedPayOption,
      nameOfPayOption: "Google Pay",
    },
    {
      svgIcon: (
        <AppleIcon
          iconHeight={20}
          iconWidth={25}
          color={
            pickedPayOption === "Apple Pay" ? COLORS.primaryOrangeHex : "white"
          }
        />
      ),
      amount: 100.5,
      onPress: handleSetSelectedPayOption,
      nameOfPayOption: "Apple Pay",
    },
    {
      pngIcon: AmazonPay,
      amount: 100.5,
      onPress: handleSetSelectedPayOption,
      nameOfPayOption: "Amazon Pay",
    },
  ];

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.navbar}>
        <BackNavBarWithProfile title="PaymentScreen" showProfilePic={false} />
      </View>

      <View style={styles.bodyArea}>
        <View style={styles.creditCard}>
          <CreditCard />
        </View>
        <View style={styles.payOptionsArea}>
          {payOptions.map((option, index) => {
            return (
              <View key={index} style={styles.payOptions}>
                <PayOption option={option} selectedOption={pickedPayOption} />
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.payContainer}>
        <PayButtonContainer
          totalValue={100.5}
          buttonName="Pay From Credit Card"
          onPressAction={handlePayment}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
    flexDirection: "column",
    paddingHorizontal: 0,
    paddingBottom: 50,
  },
  navbar: {
    width: "100%",
    height: 30,
  },
  bodyArea: {
    flex: 1,
  },
  creditCard: {
    height: SCREENHEIGHT * 0.3,
    width: SCREENWIDTH - 40,
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  payContainer: {
    height: 76,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
  payOptionsArea: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  payOptions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 50,
    width: SCREENWIDTH - 40,
  },
});
