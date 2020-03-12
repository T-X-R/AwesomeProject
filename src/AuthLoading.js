import React, {Component} from 'react';
import {
  StyleSheet, 
  Text,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

//根据是否保存了userToken，判断跳转哪个界面
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
      <ActivityIndicator />
      <Text>加载中...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})