// CartScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Carrito de compras</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#3498db',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        alignItems: 'center',
    },
});
