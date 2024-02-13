import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/Navigation";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { PayButtonContainer } from "../components/global/PayButtonContainer";
import { CreditCard } from "../components/payment/CreditCard";
import {
  SCREENHEIGHT,
  SCREENWIDTH,
  screenContainer,
} from "../assets/constants";

const PaymentScreen = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handlePayment = () => {
    navigation.navigate("HomeScreen");
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.navbar}>
        <BackNavBarWithProfile title="PaymentScreen" showProfilePic={false} />
      </View>

      <View style={styles.bodyArea}>
        <View style={styles.creditCard}>
          <CreditCard />
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

export default PaymentScreen;

const styles = StyleSheet.create({
  screenContainer: {
    ...screenContainer,
    flexDirection: "column",
    paddingHorizontal: 0,
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
});
