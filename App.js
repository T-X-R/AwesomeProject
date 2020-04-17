import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import LoginScreen from "./src/LoginScreen";
import RegistrationScreen from "./src/RegistrationScreen";
import StartUpPage from "./src/StartUpPage";
import MyHome from "./src/MyHome";
import SingerList from "./src/SingerList";
import PlayList from "./src/PlayList";
import Fans from "./src/Fans";
import Music from "./src/Music";
import MusicPlayer from "./src/MusicPlayer";
import test from "./src/test";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartUpPage} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={RegistrationScreen} />
      <Stack.Screen name="My Home" component={MyHome} />
      <Stack.Screen name="Singer List" component={SingerList} />
      <Stack.Screen name="Play List" component={PlayList} />
      <Stack.Screen name="Fans" component={Fans} />
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Music Player" component={MusicPlayer} />
      <Stack.Screen name="test" component={test} />
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
