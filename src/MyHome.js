import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';

export default class MyHome extends Component {
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Top List")}
                >
                    <Text style={styles.button}>排行榜单</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Play List")}
                >
                    <Text style={styles.button}>我的歌单</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Music")}
                >
                    <Text style={styles.button}>音乐搜索</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Collection")}
                >
                    <Text style={styles.button}>我的收藏</Text>
                </TouchableOpacity>
            </View>
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
    button: {
      fontSize: 16,
      fontWeight:"500",
      color: "#fff",
      backgroundColor:"#5FE090",
      width: 300,
      height: 60,
      paddingLeft: 123,
      borderRadius: 10,
      paddingTop: 22,
      marginBottom: 15,
  },
})