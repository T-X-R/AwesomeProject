import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import LoginScreen from "./src/LoginScreen";
import RegistrationScreen from "./src/RegistrationScreen";
import StartUpPage from "./src/StartUpPage";
import MyHome from "./src/MyHome";
import Toplist from "./src/Toplist";
import PlayList from "./src/PlayList";
import Fans from "./src/Fans";
import Music from "./src/Music";
import MusicPlayer from "./src/MusicPlayer";
import Collection from "./src/Collection";
import ListInfo from "./src/ListInfo";
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
      <Stack.Screen name="Top List" component={Toplist} />
      <Stack.Screen name="Play List" component={PlayList} />
      <Stack.Screen name="Fans" component={Fans} />
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Music Player" component={MusicPlayer} />
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="List Info" component={ListInfo} />
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
