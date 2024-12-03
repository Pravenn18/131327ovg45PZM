import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Feature2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Feature 2: Interactive Photo Canvas(Test commit)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
