import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput, 
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native'
import { PLAYLIST_DETAIL } from '../src/api';

class MusicInfo extends Component{
    constructor(props){
        super(props);
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

export default class NeteasePlayList extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.listId,
            dataSource: [],
        }
    }

    componentDidMount() {
        this.getListDetail();
    }

    async getListDetail(){
        let url = PLAYLIST_DETAIL + this.state.id;
        try{
            const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult = await res.json();
            let constantData = parsedResult.playlist.tracks;
            this.setState({
                dataSource: constantData, 
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    }

    render () {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{top: 8}}
                    data={this.state.dataSource}
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
    },
    inputKeywords:{
        width: 210,
        height: 40,
        backgroundColor: "#3F494B",
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 18,
        paddingLeft: 12,
        fontSize: 12,
        color: "#fff",
    },
})