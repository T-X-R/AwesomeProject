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
import { SEARCH_MUSIC2 } from '../src/api';
import { MUSIC_VKEY } from '../src/api';

class MusicInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            // listInfo: this.props.route.params.listInfo,
            musicId: '',
            playUrl: '',
            checkVkey: '',
            songName: '',
        }
    }

    componentDidMount() {
        const item = this.props.item;
        this.getMusicMid(item);
    }

    async getMusicMid(item){
        let url = SEARCH_MUSIC2 + item.songname + ' ' + item.singername;
        try{
            const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult = await res.json();
            let constantData = parsedResult.response.data.song.list[0].mid;
            this.setState({
                musicId: constantData,
                songName: item.songname, 
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }     
    }

    async playMusicUrl(id){
        let url = MUSIC_VKEY + id;
        try{
            const res2 = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult2 = await res2.json();
            let constantData2 = parsedResult2.response.playLists[0];
            let checkUrlData = parsedResult2.response.req_0.data.midurlinfo[0].vkey;
            this.setState({
                playUrl: constantData2,
                checkVkey: checkUrlData,
            });
            this.props.navigation.navigate("Music Player",{
                musicId: this.state.musicId,
                musicName: this.state.songName,
                code: 2,
                url: this.state.playUrl,
            });   
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render() {
        const item = this.props.item;

        return(
            <View>
                <TouchableOpacity onPress = {()=> this.playMusicUrl(this.state.musicId)}>
                    <View style={styles.container2}>
                        <Image source={require('../pic/music.jpg')} style={styles.imageStyle}/>
                        <View style={styles.container3}>
                            <Text style={styles.text} numberOfLines={1}>歌曲名：{item.songname}</Text>
                            <Text />
                            <Text style={styles.text} numberOfLines={1}>作者：{item.singername}</Text>
                            <Text />
                        </View>   
                    </View>
                </TouchableOpacity>
                <Text></Text>
            </View>
        );
    }
}

export default class QQListInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            songList: this.props.route.params.songList,
        }
    }

    render () {
        return (
        <View style={styles.container}>
            <FlatList
                style={{top: 8}}
                data={this.state.songList}
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
