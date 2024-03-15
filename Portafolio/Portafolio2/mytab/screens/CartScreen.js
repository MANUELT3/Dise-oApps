import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CartScreen() {
    return(
        <View>
            <Text style={styles.text} >Hola Cart</Text>
        </View>
    );    
}
const styles = StyleSheet.create({
    text: {
      fontSize: 30,
      alignItems: 'center',
      marginTop: '20%',
    },
});