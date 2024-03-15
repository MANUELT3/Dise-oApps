import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';


export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>¡Bienvenido a nuestra tienda de vestidos!</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/img/noimage.png')}
                    style={styles.image}
                />
            </View>
            <Text style={styles.description}>Descubre nuestra colección exclusiva de vestidos para cada ocasión.</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => handleExplorePress()}>
                <Text style={styles.exploreButtonText}>Explorar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

function handleExplorePress() {
    console.log('Explorar más');
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '90%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    exploreButton: {
        backgroundColor: '#FF1493',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    exploreButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
