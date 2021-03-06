import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView, 
} from 'react-native';
import SQLite from '../SQLite';
import Reactotron from "reactotron-react-native";

let sqlite = new SQLite();
var db;
db = sqlite.initDB();

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            phoneNum: "",
            pwd: "",
        };
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    selectExactData(value1, value2){
        Keyboard.dismiss();
        let sql = `SELECT * FROM USER WHERE phone = ${value1}`
        var num = [];
        db.executeSql(sql, [], (result) => {
            for (let i = 0; i < result.rows.length; i++) {
                num.push(result.rows.item(i))
            }
            if(num.length == 0){
                alert("手机号不存在！");
            } else{
                let checkPwd = num[0].pwd;
                if(checkPwd == value2){
                    alert("登录成功！");
                    this.props.navigation.navigate("My Home"); 
                } else{
                    alert("用户名或密码不正确！");
                }
            }
        });
    }

    render() {
        return (
            <TouchableOpacity 
                onPress={() => { Keyboard.dismiss(); }} 
                activeOpacity={1} style={{flex: 1}}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <Text style={styles.textId}>手机号</Text>
                    <TextInput style={styles.inputId} 
                        placeholder="请输入手机号码" 
                        placeholderTextColor = "#fff"
                        onChangeText={(text) => this.updateTextInput(text, 'phoneNum')}
                    >
                    </TextInput>
                    <Text style={styles.textPwd}>密码</Text>
                    <TextInput style={styles.inputPwd} 
                        secureTextEntry={true}
                        placeholder="请输入密码" 
                        placeholderTextColor = "#fff"
                        onChangeText={(text) => this.updateTextInput(text, 'pwd')}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={()=>this.selectExactData(this.state.phoneNum, this.state.pwd)}>
                        <Text style={styles.buttonLogin}>登录</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1A2225',
    },
    textId: {
        color: "#fff",
        fontSize: 20,
        paddingRight: 220,
        paddingBottom: 5,
    },
    inputId:{
        width: 300,
        height: 60,
        backgroundColor: "#3F494B",
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#fff",
    },
    textPwd: {
        color: "#fff",
        fontSize: 20,
        paddingRight: 240,
        paddingBottom: 5,
    },
    inputPwd:{
        width: 300,
        height: 60,
        backgroundColor: "#3F494B",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#fff",
        marginBottom: 50,
    },
    buttonLogin:{
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
        backgroundColor:"#5FE090",
        width: 150,
        height: 60,
        paddingLeft: 59,
        paddingTop: 22,
    },
})