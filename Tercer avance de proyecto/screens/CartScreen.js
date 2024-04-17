import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CartScreen({ route }) {
  const { cartItems, setCartItems } = route.params || { cartItems: [], setCartItems: () => {} };

  const setCartItemsLocally = (newCartItems) => {
    setLocalCart(newCartItems);
  };

  const [localCart, setLocalCart] = React.useState(cartItems);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    setLocalCart(cartItems);
  }, [cartItems]);

  const renderCartItems = () => {
    return localCart.map((cartItem, index) => (
      <View key={index} style={styles.cartItem}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{cartItem.vestido.nombre}</Text>
          <Text style={styles.itemPrice}>${formatPrice(cartItem.vestido.precioVenta)}</Text>
          <Text>Cantidad: {cartItem.cantidad}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(index)}>
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FF5733" />
        </TouchableOpacity>
      </View>
    ));
  };

  const removeFromCart = (index) => {
    const newCartItems = [...localCart];
    newCartItems.splice(index, 1);
    setCartItemsLocally(newCartItems);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    setLocalCart([]);
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  const handleBuyPress = () => {
    setModalVisible(true);
  };

  const handleAcceptModal = () => {
    setModalVisible(false);
    clearCart();
  };

  const subtotal = localCart.reduce((total, item) => total + (item.vestido.precioVenta * item.cantidad), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Carrito de compras</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {localCart.length === 0 ? (
          <Text style={styles.emptyCartText}>No hay artículos en el carrito</Text>
        ) : (
          renderCartItems()
        )}
      </ScrollView>
      {localCart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.subtotalText}>Subtotal: ${formatPrice(subtotal)}</Text>
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearButtonText}>Vaciar Carrito</Text>
          </TouchableOpacity>
        </View>
      )}
      {localCart.length > 0 && (
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Pago exitoso!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleAcceptModal}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#e7d7c9',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 30,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  cartItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#555',
  },
  deleteButton: {
    marginLeft: 10,
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#555',
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotalText: {
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
