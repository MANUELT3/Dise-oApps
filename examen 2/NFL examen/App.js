import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import nflLogo from "./assets/nfl.png";

const url = "https://jsonplaceholder.typicode.com/todos";

const MenuScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const displayTodos = (option) => {
    let filteredData;
    switch (option) {
      case "Todos":
        filteredData = todos;
        break;
      case "Todos (ID y Título)":
        filteredData = todos.map((todo) => ({
          id: todo.id,
          title: todo.title,
        }));
        break;
      case "Pendientes (ID y Título)":
        filteredData = todos
          .filter((todo) => !todo.completed)
          .map((todo) => ({ id: todo.id, title: todo.title }));
        break;
      case "Completados (ID y Título)":
        filteredData = todos
          .filter((todo) => todo.completed)
          .map((todo) => ({ id: todo.id, title: todo.title }));
        break;
      case "Todos (ID y Usuario)":
        filteredData = todos.map((todo) => ({
          id: todo.id,
          userId: todo.userId,
        }));
        break;
      case "Pendientes (ID y Usuario)":
        filteredData = todos
          .filter((todo) => !todo.completed)
          .map((todo) => ({ id: todo.id, userId: todo.userId }));
        break;
      case "Completados (ID y Usuario)":
        filteredData = todos
          .filter((todo) => todo.completed)
          .map((todo) => ({ id: todo.id, userId: todo.userId }));
        break;
      default:
        filteredData = [];
    }

    navigation.navigate("TodoDetails", { todos: filteredData });
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => displayTodos(item)}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={nflLogo} style={styles.logo} resizeMode="contain" />
        <FlatList
          data={[
            "Todos",
            "Todos (ID y Título)",
            "Pendientes (ID y Título)",
            "Completados (ID y Título)",
            "Todos (ID y Usuario)",
            "Pendientes (ID y Usuario)",
            "Completados (ID y Usuario)",
          ]}
          renderItem={renderOption}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
};

const TodoDetailsScreen = ({ route }) => {
  const { todos } = route.params;

  return (
    <View style={styles.resultsContainer}>
      {todos.map((todo, index) => (
        <View key={todo.id.toString()} style={styles.itemContainer}>
          <View style={styles.itemRow}>
            <Text style={styles.labelText}>ID:</Text>
            <Text style={styles.valueText}>{todo.id}</Text>
          </View>
          {todo.title && (
            <View style={styles.itemRow}>
              <Text style={styles.labelText}>Título:</Text>
              <Text style={[styles.valueText, styles.titleText]}>
                {todo.title}
              </Text>
            </View>
          )}
          {todo.userId && (
            <View style={styles.itemRow}>
              <Text style={styles.labelText}>Usuario:</Text>
              <Text style={[styles.valueText, styles.userIdText]}>
                {todo.userId}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: "Tareas Pendientes NFL" }}
        />
        <Stack.Screen
          name="TodoDetails"
          component={TodoDetailsScreen}
          options={{ title: "Detalles" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: "#002244",
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: 150,
    alignSelf: "center",
    marginBottom: 30,
  },
  optionButton: {
    borderRadius: 20,
    width: "30%",
    padding: 10,
    backgroundColor: "#CC0000",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: "1%",
  },
  optionText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  resultsContainer: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginTop: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  labelText: {
    width: 80,
    fontWeight: "bold",
    color: "#333",
  },
  valueText: {
    flex: 1,
    color: "#666",
  },
  titleText: {
    fontStyle: "italic",
    color: "#555",
  },
  userIdText: {
    fontStyle: "italic",
    color: "#888",
  },
});

export default App;
