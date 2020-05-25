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

    playMusic(item){
        this.props.navigation.navigate("Music Player",{
            musicId: item.id,
            code: 1,
            url: '',
        });        
    }

    render() {
        const item = this.props.item;

        return(
            <View>
                <TouchableOpacity onPress = {()=> this.playMusic(item)}>
                    <View style={styles.container2}>
                        <Image source={{url: item.al.picUrl}} style={styles.imageStyle}/>
                        <View style={styles.container3}>
                            <Text style={styles.text} numberOfLines={1}>歌曲名：{item.name}</Text>
                            <Text />
                            <Text style={styles.text} numberOfLines={1}>作者：{item.ar[0].name}</Text>
                            <Text />
                            <Text style={styles.text} numberOfLines={1}>专辑：{item.al.name}</Text>
                            <Text />
                        </View>   
                    </View>
                </TouchableOpacity>
                <Text></Text>
            </View>
        );
    }
}

export default class NeteaseListInfo extends Component {
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
    container2: {
        flexDirection:'row',
        // marginBottom: 10,
    },
    container3: {
        flexDirection:'column',
        marginLeft: 60,
        justifyContent: 'center',
        width: 200,
    },
    text:{
        color: 'white',
        fontSize: 15,
    },
    imageStyle:{
        width: 160,
        height:160,
        borderRadius: 5,
        left: 12,
    }
})