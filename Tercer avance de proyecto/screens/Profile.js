import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import { apiURL } from '../backend/Apiglobal';

export default function Profile({ navigation }) {
  const userData = {
    nombreUser: "Bienvenido usuario",
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
      <View style={styles.header}>
        <Image
          source={require("../assets/img/usuario.png")}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{userData.nombreUser}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Historial de compras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogoutPress}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    backgroundColor: "#FF1493",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: "#e7d7c9",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "rgb(116, 14, 14)",
    fontSize: 16,
    textAlign: "center",
  },
});
