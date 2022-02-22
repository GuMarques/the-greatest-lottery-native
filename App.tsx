import React, { useState } from "react";
import { Login } from "@screens";
import AppLoading from "expo-app-loading";
import { StyleSheet, Text, View } from "react-native";
import fetchFonts from "@utils/fetch-fonts";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.warn}
      />
    );
  }
  return <Login />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
