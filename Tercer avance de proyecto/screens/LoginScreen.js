import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { apiURL } from '../backend/Apiglobal';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu nombre de usuario y contraseña.');
      return;
    }

    try {
      const response = await axios.post(apiURL + '/api/login', { username, password });
      if (response.data.success) {
        const user = response.data.user;
        if (user.categoria === 'A') {
          // navigation.replace('AdminScreen');
          navigation.navigate('Main', { screen: 'AdminScreen' });
        } else {
          navigation.replace('Main');
        }
      } else {
        Alert.alert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.overlay}>
      <Text style={styles.heading}>¡Bienvenido a Galatex!</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          value={username}
          onChangeText={text => setUsername(text)}
          placeholderTextColor="#333"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor="#333"
        />
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#e7d7c9',
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: 'rgb(116, 14, 14)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
