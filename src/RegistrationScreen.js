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
import Reactotron from "reactotron-react-native";

let sqlite = new SQLite();
sqlite.initDB();
sqlite.createUserTable();

export default class SignUp extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            phone: '',
            pwd: '',
            conpwd: '',
        };
        this.createUser = this.createUser.bind(this);
    }
  
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }
  
    createUser() {
        if (this.state.pwd == this.state.conpwd && this.state.userName != null && this.state.phone != null && this.state.pwd) {
            //   var userData = [];
            let user={
                userName: this.state.userName,
                phone: this.state.phone,
                pwd: this.state.pwd,
            }
            Reactotron.log(user);
            //   userData.push(user)
            sqlite.insertData("USER", user)
        }
        //Todo
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
                        value={this.state.userName}
                        // onChangeText={this.userChange}
                        onChangeText={(text) => this.updateTextInput(text, 'userName')}
                        />

                        <Text style={styles.txtPhone}>手机号</Text>
                        <TextInput
                        style={styles.inputA}
                        placeholder="请输入手机号"
                        placeholderTextColor="#fff"
                        // onChangeText={this.phoneChange}
                        onChangeText={(text) => this.updateTextInput(text, 'phone')}
                        />

                        <Text style={styles.txtPwd}>密码</Text>
                        <TextInput
                        style={styles.inputB}
                        placeholder="请输入密码"
                        secureTextEntry={true}
                        placeholderTextColor="#fff"
                        // onChangeText={this.pwdChange}
                        onChangeText={(text) => this.updateTextInput(text, 'pwd')}
                        />

                        <Text style={styles.txtCon}>确认密码</Text>
                        <TextInput
                        style={styles.inputB}
                        placeholder="请再次确认密码"
                        secureTextEntry={true}
                        placeholderTextColor="#fff"
                        onChangeText={(text) => this.updateTextInput(text, 'conpwd')}
                        />
                        <TouchableOpacity onPress={() => this.createUser()}>
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