import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Button({onPress}) {
  return (
    <View>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Hola</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop:  10,
    paddingBottom: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
  