import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
    const handleExplorePress = () => {
        console.log('Explorar más');
        // Aquí puedes navegar a la pantalla de catálogo u otra pantalla según tu flujo de navegación
        navigation.navigate('Catalogue');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>¡Bienvenido a nuestra tienda de vestidos!</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/img/inicio.jpeg')}
                    style={styles.image}
                />
            </View>
            <Text style={styles.description}>Descubre nuestra colección exclusiva de vestidos para cada ocasión.</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={handleExplorePress}>
                <Text style={styles.exploreButtonText}>Explorar</Text>
            </TouchableOpacity>

            {/* Sección de beneficios */}
            <View style={styles.benefitsContainer}>
                <View style={styles.benefit}>
                    <Image
                        source={require('../assets/img/tarjeta.png')}
                        style={styles.benefitIcon}
                    />
                    <Text style={styles.benefitTitle}>Pago seguro</Text>
                    <Text style={styles.benefitDescription}>Utilizamos métodos de pago confiables.</Text>
                </View>
                <View style={styles.benefit}>
                    <Image
                        source={require('../assets/img/seguridad.png')}
                        style={styles.benefitIcon}
                    />
                    <Text style={styles.benefitTitle}>Confianza y seguridad</Text>
                    <Text style={styles.benefitDescription}>Ofrecemos productos de alta calidad y garantizados.</Text>
                </View>
                <View style={styles.benefit}>
                    <Image
                        source={require('../assets/img/costura.png')}
                        style={styles.benefitIcon}
                    />
                    <Text style={styles.benefitTitle}>Alta costura</Text>
                    <Text style={styles.benefitDescription}>Prendas únicas que te harán sentir especial y elegante.</Text>
                </View>
            </View>
        </ScrollView>
    );
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
        marginTop: 20,
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
        marginBottom: 20,
    },
    exploreButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    benefitsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    benefit: {
        alignItems: 'center',
        width: '90%',
        maxWidth: 200,
        marginBottom: 20,
    },
    benefitIcon: {
        width: 70,
        height: 70,
        marginBottom: 10,
    },
    benefitTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    benefitDescription: {
        fontSize: 14,
        textAlign: 'center',
    },
});
