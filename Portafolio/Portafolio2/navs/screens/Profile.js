import React from "react";
import { View, Text, StyleSheet } from "react-native";



export default function Profile({ navigation }) {
    return(
        <View style={styles.text}>
            <Text>
                This is the profile page. It will display
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {

      alignItems: 'center',
      justifyContent: 'center',
    },
  });