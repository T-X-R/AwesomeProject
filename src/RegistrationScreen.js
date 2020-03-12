import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import SQLite from '../SQLite';
var s = new SQLite();
var userName;
var phone;
var pwd;

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  
  constructor(props){
      super(props);
      
      this.userChange = this.userChange.bind(this);
      this.phoneChange = this.userChange.bind(this);
      this.pwdChange = this.userChange.bind(this);
      this.state = {
            userName: "",
            phone: "",
            pwd: "",
        };
      }
  

  userChange(inputTxt){
      console.log("输入的内容",inputTxt);
      this.setState({userName: inputTxt});
  }
  phoneChange(inputTxt){
      console.log("输入的内容",inputTxt);
      this.setState({phone: inputTxt});
  }
  pwdChange(inputTxt){
      console.log("输入的内容",inputTxt);
      this.setState({pwd: inputTxt});
  }

  
  createUser() {
      s.initDB();
      s.createTable();
      var userData = [];
      let user={
          userName,
          phone,
          pwd,
      }
      userData.push(user)
      s.insertData(this.userInfo, userData)
      s.closeDB();
  }

  render() {
    return (
        <TouchableOpacity 
            onPress={() => { Keyboard.dismiss(); }} 
            activeOpacity={1} style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.container}>
                    
                    <Text style={styles.txtUser}>用户名</Text>
                    <TextInput
                    style={styles.inputA}
                    placeholder="请输入用户名"
                    placeholderTextColor="#fff"
                    onChangeText={this.userChange}
                    />

                    <Text style={styles.txtPhone}>手机号</Text>
                    <TextInput
                    style={styles.inputA}
                    placeholder="请输入手机号"
                    placeholderTextColor="#fff"
                    onChangeText={this.phoneChange}
                    />

                    <Text style={styles.txtPwd}>密码</Text>
                    <TextInput
                    style={styles.inputB}
                    placeholder="请输入密码"
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    onChangeText={this.pwdChange}
                    />

                    <Text style={styles.txtCon}>确认密码</Text>
                    <TextInput
                    style={styles.inputB}
                    placeholder="请再次确认密码"
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    />
                    <TouchableOpacity onPress={this.createUser}>
                        <Text style={styles.buttonCreate}>创建账户</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A2225",
        alignItems: "center",
        justifyContent: "center",
    },
    txtUser: {
        paddingRight: 280,
        paddingBottom: 3,
        color: "#fff",
        fontSize: 15,
    },
    txtPhone: {
        paddingRight: 280,
        paddingBottom: 3,
        color: "#fff",
        fontSize: 15,
    },
    txtPwd: {
        paddingRight: 290,
        paddingBottom: 3,
        color: "#fff",
        fontSize: 15,
    },
    txtCon: {
        paddingRight: 260,
        paddingBottom: 3,
        color: "#fff",
        fontSize: 15,    
    },
    inputA: {
        width: 345,
        height: 60,
        color: "white",
        backgroundColor: "#3F494B",
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#fff"
    },
    inputB: {
        width: 345,
        height: 60,
        color: "white",
        backgroundColor: "#3F494B",
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#fff"
    },
    buttonCreate:{
            fontSize: 15,
            fontWeight: "500",
            color: "#fff",
            backgroundColor:"#5FE090",
            width: 150,
            height: 60,
            paddingLeft: 45,
            paddingTop: 22,
            marginTop: 30,
    },
});