import React, { Component } from 'react';
import {
  View,
  Text ,
  StyleSheet,
  Button,
  AsyncStorage
} from 'react-native';

export default class MyCenterScreen extends Component {

  static navigationOptions = {
      title:'我'
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _signOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
            title='注销登录'
            onPress={this._signOutAsync}
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})