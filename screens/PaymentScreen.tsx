import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { BackNavBarWithProfile } from "../components/global/BackNavBarWithProfile";
import { PayButtonContainer } from "../components/global/PayButtonContainer";
import { screenContainer } from "../assets/constants";

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

      <View style={styles.bodyArea}></View>
      <Text>PaymentScreen</Text>
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
  payContainer: {
    height: 76,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
});
