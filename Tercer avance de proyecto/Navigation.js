import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native'; 
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import Profile from "./screens/Profile";
import CatalogueScreen from "./screens/CatalogueScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state. Check:']);

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Catalogue"
        component={CatalogueScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Catálogo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera-burst" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Carrito",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
