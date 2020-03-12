import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  Platform,
  Dimensions,
  TouchableOpacity
} from "react-native";
import LoginScreen from "../src/LoginScreen";
import RegistrationScreen from "../src/RegistrationScreen";

export default class StartUpPage extends Component {
  
  render() {
    return (
        <View style={styles.containerFirst}>
            <View style={styles.containerSecond}>
                <Text style={styles.textWelcome}>欢迎!</Text>
                <Text style={styles.textNote}>请登录~</Text>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={styles.buttonLogIn}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Sign Up")}
                >
                    <Text style={styles.buttonSignUp}>注册</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerFirst: {
    flex: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: 5,
    alignItems: "center",
    backgroundColor: "#1A2225",
    paddingLeft: 140,
  },
  containerSecond:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F494B",
    width: 400,
    height: 270,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginRight: 140,
  },
  textWelcome: {
    fontSize: 30,
    color: "#fff",
    paddingBottom: 3,
  },
  textNote: {
    fontSize: 15,
    color: "#5F676A",
    paddingBottom: 30,
  },
  buttonLogIn: {
      fontSize: 16,
      fontWeight:"500",
      color: "#fff",
      backgroundColor:"#5FE090",
      width: 300,
      height: 60,
      paddingLeft: 135,
      borderRadius: 10,
      paddingTop: 22,
      marginBottom: 15,
  },
  buttonSignUp: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    backgroundColor:"#5F676A",
    width: 300,
    height: 60,
    paddingLeft: 135,
    borderRadius: 10,
    paddingTop: 22,
  },
});