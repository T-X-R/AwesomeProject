import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'

export default class Collection extends Component {
  constructor(props){
    super(props);
    this.state = {
      musicId: this.props.route.params.id,
      musicUrl: this.props.route.params.url,
      code: this.props.route.params.c,
    }
  }


  render () {

    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View>
            <Text style={styles.text}>{this.state.musicId}</Text>
            <Text style={styles.text}>{this.state.musicUrl}</Text>
            {/* <Text style={styles.text}>{item.artists.name}</Text> */}
            <Text style={styles.text}>{this.state.code}</Text>
            <Text></Text>
          </View>
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        backgroundColor: '#1A2225',
    },
    text:{
        color: 'white',
        fontSize: 15,
    },
})