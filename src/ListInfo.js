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

class MusicInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            // listInfo: this.props.route.params.listInfo,
        }
        this.playMusic=this.playMusic.bind(this);
    }

    playMusic(id){
        this.props.navigation.navigate("Music Player",{
            musicId: id,
            code: 1,
            url: '',
        });
            
    }

    render() {
        const item = this.props.item;

        return(
            <View>
                <TouchableOpacity onPress = {()=> this.playMusic(item.id)}>
                    <View>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.id}</Text>
                        <Text></Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default class ListInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            listInfo: this.props.route.params.listInfo,
        }
    }

    render () {
        return (
        <View style={styles.container}>
            <FlatList
                style={{top: 8}}
                data={this.state.listInfo}
                renderItem={({item}) => <MusicInfo item={item} navigation={this.props.navigation}/>}
            />
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