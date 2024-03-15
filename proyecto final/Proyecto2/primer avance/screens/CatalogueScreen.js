import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import vestidosData from './Vestidos.json';

// Función para importar todas las imágenes de la carpeta
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

// Importa todas las imágenes de la carpeta de imágenes
const images = importAll(require.context('../assets/img/vestidosimg', false, /\.(png|jpe?g|svg)$/));

export default function CatalogueScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Elige un Vestido Para Comprar En Paquetes</Text>
            <View style={styles.galleryContainer}>
                {vestidosData[0].data.map((vestido, index) => (
                    <TouchableOpacity key={index} >
                        <View style={styles.card}>
                            <Image
                                source={images[vestido.imagen1]}
                                onError={() => ({ uri: './noimage.png' })}
                                style={styles.image}
                            />
                            {/* <Text style={styles.title}>{vestido.nombre}</Text> */}
                            <Text style={styles.price}>Precio: ${vestido.precioVenta}</Text>
                            <Text style={styles.size}>Talla: {vestido.talla}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.footer}>©2023 Derechos reservados</Text>
        </ScrollView>
    );
}

//Se usara despues en touchableonPress={() => handleVestidoPress(vestido.codigo)}
// function handleVestidoPress(codigo) {
//     console.log('Vestido seleccionado:', codigo);
// }

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: '100%',
        height: 300, // Altura fija para todas las tarjetas
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        overflow: 'hidden', // Asegura que el contenido dentro no se desborde
    },
    image: {
        width: '100%',
        height: '80%', 
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: 'cover', 
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    price: {
        fontSize: 12,
        paddingHorizontal: 10,
        marginBottom: 3,
    },
    size: {
        fontSize: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#666666',
    },
    footer: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 12,
        color: '#666666',
    },
});
