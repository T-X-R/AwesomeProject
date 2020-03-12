import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import LoginScreen from "./src/LoginScreen";
import RegistrationScreen from "./src/RegistrationScreen";
import StartUpPage from "./src/StartUpPage";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={StartUpPage} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
