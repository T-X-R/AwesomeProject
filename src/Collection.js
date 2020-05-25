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
import SQLite from '../SQLite';
import { MUSIC_DETAIL } from '../src/api';
import { MUSIC_DETAIL2 } from '../src/api';
import Reactotron from 'reactotron-react-native';

class MyCollect extends Component{
    constructor(props){
        super(props);
        this.state = {
          pic: '',
          artist: '',
          description: '',
          origin: '',
        }
        this.playMusic=this.playMusic.bind(this);
    }

    async componentDidMount() {
        const item = this.props.item;
        await this.fetchDetail(item);
    }

    playMusic(item){
        this.props.navigation.navigate("Music Player",{
            musicId: item.musicId,
            code: item.code,
            url: item.playUrl,
        });        
    }

    async fetchDetail(item){
      if(item.code == 1) {
        let url = MUSIC_DETAIL + item.musicId;
        try{
            const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult = await res.json();
            let getImgUrl = parsedResult.songs[0].al.picUrl;
            let getArtist = parsedResult.songs[0].ar[0].name;
            let getDescription = parsedResult.songs[0].alia[0];
            this.setState({
                pic: getImgUrl,
                artist: getArtist,
                description: getDescription,
                origin: '网易云音乐',
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
      } else {
          let url = MUSIC_DETAIL2 + item.musicId;
          try{
              const res2 = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
            });
            const parsedResult2 = await res2.json();
            let getArtist = parsedResult2.response.songinfo.data.track_info.singer[0].name;
            let getDescription = parsedResult2.response.songinfo.data.track_info.subtitle;
            this.setState({
                pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589288244983&di=954559d28fe50110ffc332a127352acd&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D37279219%2C636865625%26fm%3D214%26gp%3D0.jpg',
                artist: getArtist,
                description: getDescription,
                origin: 'QQ音乐',
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
      }
    };

    render() {
        const item = this.props.item;

        return(
            <View>
                <TouchableOpacity onPress = {()=> this.playMusic(item)}>
                    <View style={styles.container2}>
                        <Image source={{url: this.state.pic}} style={styles.imageStyle}/>
                        <View style={styles.container3}>
                          <Text style={styles.text} numberOfLines={1}>歌曲名：{item.musicName}</Text>
                          <Text style={styles.text} numberOfLines={1}>作者：{this.state.artist}</Text>
                          <Text style={styles.text} numberOfLines={1}>{this.state.description}</Text>
                          <Text style={styles.text} numberOfLines={1}>来源：{this.state.origin}</Text>
                        </View>   
                    </View>
                </TouchableOpacity>
                <Text></Text>
            </View>
        );
    }
}

export default class Collection extends Component {
  constructor(props){
    super(props);
    this.sqlite = new SQLite();
    this.state = {
      dataSource: [],
    }
  }

  async componentDidMount(){
    this.setState({
      dataSource: await this.selectM()
    });
  }

  async selectM(){
    var db;
    db = await this.sqlite.initDB();

    const sqlResult = await db.executeSql('SELECT * FROM COLLECT');
    Reactotron.log(sqlResult)
    const result = sqlResult[0].rows;
    let songs = [];

    for(i = 0; i < result.length; i++) {
      songs.push(result.item(i))
    }

    return songs;
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          style={{top: 8}}
          data={this.state.dataSource}
          renderItem={({item}) => <MyCollect item={item} navigation={this.props.navigation}/>
          }
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
        marginLeft: 35,
        justifyContent: 'center',
        width: 200,
    },
    imageStyle:{
        width: 160,
        height:160,
        borderRadius: 5,
        left: 12,
    },
    text:{
        color: 'white',
        fontSize: 15,
    },
})