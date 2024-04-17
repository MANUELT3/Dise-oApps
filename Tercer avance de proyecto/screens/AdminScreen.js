import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { apiURL } from '../backend/Apiglobal';

export default function AdminScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [talla, setTalla] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [imagen, setImagen] = useState('');

  const handleAgregarVestido = async () => {
    try {
      const response = await axios.post(apiURL + '/api/vestido', { codigo, nombre, talla, descripcion, precioVenta});
      if (response.data.success) {
        Alert.alert('Éxito', response.data.message);
      } else {
        Alert.alert('Error', 'Ocurrió un error al intentar agregar el vestido. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar agregar el vestido. Por favor, inténtalo de nuevo más tarde. Detalles: ' + error.message);
    }
  };

  const handleLogoutPress = async () => {
    try {
      const response = await axios.post(apiURL + '/api/logout');
      if (response.data.success) {
        navigation.replace('Login');
      } else {
        Alert.alert('Error', 'Ocurrió un error al intentar cerrar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar cerrar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Agregar Vestido</Text>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={text => setCodigo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del vestido"
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <View style={styles.tallaContainer}>
        <TouchableOpacity
          style={[styles.tallaButton, talla === 'S' && styles.selectedButton]}
          onPress={() => setTalla('S')}
        >
          <Text style={styles.buttonText}>S</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tallaButton, talla === 'M' && styles.selectedButton]}
          onPress={() => setTalla('M')}
        >
          <Text style={styles.buttonText}>M</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tallaButton, talla === 'L' && styles.selectedButton]}
          onPress={() => setTalla('L')}
        >
          <Text style={styles.buttonText}>L</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={text => setDescripcion(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio de Venta"
        value={precioVenta}
        onChangeText={text => setPrecioVenta(text)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Imagen"
        value={imagen}
        onChangeText={text => setImagen(text)}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleAgregarVestido}>
        <Text style={styles.buttonText}>Agregar Vestido</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  tallaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  tallaButton: {
    backgroundColor: '#e7d7c9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
