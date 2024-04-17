import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { apiURL } from "../backend/Apiglobal";

export default function CatalogueScreen() {
  const [vestidosData, setVestidosData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDress, setSelectedDress] = useState(null);
  const [cantidad, setCantidad] = useState(20); // Cantidad por defecto
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiURL + "/api/vestidos");
      setVestidosData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const importAll = (r) => {
    return r.keys().reduce((images, path) => {
      images[path.replace("./", "")] = r(path);
      return images;
    }, {});
  };
  const images = importAll(
    require.context("../assets/img/vestidosimg", false, /\.(png|jpe?g|svg)$/)
  );

  const addToCart = () => {
    const item = { vestido: selectedDress, cantidad };
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    setCart([...cart, item]);
    setModalVisible(false);
    navigation.navigate("Cart", {
      selectedDress,
      cartItems: updatedCartItems,
      cart,
      setCartItems,
    });
  };

 

  const handleCantidadChange = (value) => {
    setCantidad(value);
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return title;
  };

  const renderCards = () => {
    return vestidosData.map((vestido, index) => (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => {
          setSelectedDress(vestido);
          setModalVisible(true);
        }}
      >
        <Image source={images[vestido.imagen1]} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{truncateTitle(vestido.nombre)}</Text>
          <Text style={styles.price}>Precio: ${vestido.precioVenta}</Text>
          <Text style={styles.size}>Talla: {vestido.talla}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Elige un Vestido Para Comprar En Paquetes
      </Text>
      <View style={styles.galleryContainer}>{renderCards()}</View>
      <Text style={styles.footer}>©2023 Derechos reservados</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedDress?.nombre}</Text>
            <Image
              source={images[selectedDress?.imagen1]}
              style={styles.modalImage}
            />
            <Text>{selectedDress?.descripcion}</Text>
            <Text>Precio: ${selectedDress?.precioVenta}</Text>

            {/* Botones para seleccionar la cantidad */}
            <View style={styles.cantidadContainer}>
              <TouchableOpacity
                style={[
                  styles.cantidadButton,
                  cantidad === 20 && styles.selectedCantidadButton,
                ]}
                onPress={() => handleCantidadChange(20)}
              >
                <Text style={styles.cantidadButtonText}>20</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cantidadButton,
                  cantidad === 40 && styles.selectedCantidadButton,
                ]}
                onPress={() => handleCantidadChange(40)}
              >
                <Text style={styles.cantidadButtonText}>40</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cantidadButton,
                  cantidad === 60 && styles.selectedCantidadButton,
                ]}
                onPress={() => handleCantidadChange(60)}
              >
                <Text style={styles.cantidadButtonText}>60</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cantidadButton,
                  cantidad === 80 && styles.selectedCantidadButton,
                ]}
                onPress={() => handleCantidadChange(80)}
              >
                <Text style={styles.cantidadButtonText}>80</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={addToCart}
            >
              <Text style={styles.addToCartButtonText}>Agregar al Carrito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
  },
  size: {
    fontSize: 14,
    color: "#888",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // borderColor: 'black',
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  cantidadContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  cantidadButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedCantidadButton: {
    backgroundColor: "#e7d7c9",
  },
  cantidadButtonText: {
    color: "rgb(116, 14, 14)",
  },

  addToCartButton: {
    backgroundColor: "#e7d7c9",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: "rgb(116, 14, 14)",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: "#000",
    fontSize: 16,
  },
  cartButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
