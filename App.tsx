import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Navigation } from "./navigation/Navigation";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Navigation></Navigation>
      </NavigationContainer>
      <StatusBar style="dark" animated={true} backgroundColor="transparent" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
