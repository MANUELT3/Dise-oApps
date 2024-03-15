import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../screens/Profile";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export default function MainStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Profile' component={Profile}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}