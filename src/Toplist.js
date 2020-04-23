import React, { Component } from 'react';
import { 
    Text, 
    View,
    Image,
    StyleSheet,
    FlatList,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
// import Dropdownmenu from 'react-native-dropdownmenus';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { TOP_LIST } from '../src/api';
import { PLAYLIST_DETAIL } from '../src/api';
import { TOP_LIST2 } from '../src/api';

var { h, w } =  Dimensions.get('window');

class TopMusic extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: [],
        }
    }

    async getPlaylist(id){
        let url = PLAYLIST_DETAIL + id;
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
                info: constantData,
            });
            
            this.props.navigation.navigate("List Info",{
                listInfo: this.state.info,
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render() {
        const item = this.props.item;

        return (
            <View>
                <TouchableOpacity onPress = {()=> this.getPlaylist(item.id)}>
                    <View style={styles.container2}>
                        <Image source={{url: item.coverImgUrl}} style={styles.imageStyle}/>
                        <View style={styles.container3}>
                            {/* <Text style={styles.text} numberOfLines={1}>1. {item.tracks[0].first} - {item.tracks[0].second}</Text>  */}
                            {/* <Text></Text> */}
                            <Text style={styles.text} numberOfLines={1}>{item.description}</Text> 
                            {/* <Text></Text> */}
                            {/* <Text style={styles.text} numberOfLines={1}>3. {item.songList[2].songname} - {item.songList[2].singername}</Text>  */}
                        </View>   
                    </View>
                </TouchableOpacity>
                <Text></Text>
            </View>
        )
    }
}

class TopMusic2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: [],
        }
        // this.playMusic=this.playMusic.bind(this);
    }

    // componentDidMount() {
    //     this.getToplist();
    // }

    // playMusic(id){
    //     if(this.state.checkUrl == true){
    //         this.props.navigation.navigate("Music Player",{
    //             musicId: id,
    //             code: 1,
    //             url: '',
    //         });
    //     } else{
    //         alert('没有版权!');
    //     }
    // }
    
    // async getToplist(){
    //     // let url = CHECK_MUSIC + id;
    //     try{
    //         const res = await fetch(TOPLIST, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //         });
    //         const parsedResult = await res.json();
    //         let constantData = parsedResult.response.data.topList;
    //         this.setState({
    //             info: constantData,
    //         });
    //     } catch (err) {
    //         alert(err);
    //         console.error(err);
    //     }
    // };

    render() {
        const item = this.props.item;

        return (
            <View >
                <TouchableOpacity>
                    <View style={styles.container2}>
                        <Image source={{url: item.picUrl}} style={styles.imageStyle}/>
                        <View style={styles.container3}>
                            <Text style={styles.text} numberOfLines={1}>1. {item.songList[0].songname} - {item.songList[0].singername}</Text> 
                            <Text></Text>
                            <Text style={styles.text} numberOfLines={1}>2. {item.songList[1].songname} - {item.songList[1].singername}</Text> 
                            <Text></Text>
                            <Text style={styles.text} numberOfLines={1}>3. {item.songList[2].songname} - {item.songList[2].singername}</Text> 
                        </View>   
                    </View>
                </TouchableOpacity>
                <Text></Text>
            </View>
        )
    }
}

export default class Toplist extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            dataSourceQ: [],
        }
    } 

    async componentDidMount() {
        await this.getToplist();
        await this.getToplist2();
    }

    async getToplist(){
        // let url = CHECK_MUSIC + id;
        try{
            const res = await fetch(TOP_LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult = await res.json();
            let constantData = parsedResult.list;
            // let constantData = parsedResult.list.tracks[0].first;
            this.setState({
                dataSource: constantData,
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    async getToplist2(){
        // let url = CHECK_MUSIC + id;
        try{
            const resQ = await fetch(TOP_LIST2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResultQ = await resQ.json();
            let constantDataQ = parsedResultQ.response.data.topList;
            this.setState({
                dataSourceQ: constantDataQ,
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <ScrollableTabView
                    initialPage={0}
                    tabBarActiveTextColor='white'
                    tabBarInactiveTextColor='#777777'
                    tabBarTextStyle={{fontSize: 15}}
                    tabBarUnderlineStyle={styles.underlineStyle}
                >
                    <View tabLabel='网易云音乐'>
                        <FlatList
                            style={{top: 8}}
                            data={this.state.dataSource}
                            renderItem={({item}) => <TopMusic item={item} navigation={this.props.navigation}/>}
                        />
                    </View>
                    <View tabLabel='QQ音乐'>
                        <FlatList
                            style={{top: 8}}
                            data={this.state.dataSourceQ}
                            renderItem={({item}) => <TopMusic2 item={item} />}
                        />
                    </View>
                </ScrollableTabView>
            </View>   
        );
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
    },
    container3: {
        flexDirection:'column',
        marginLeft: 35,
        justifyContent: 'center',
        width: 200,
    },
    text:{
        color: 'white',
        fontSize: 15,
    },
    underlineStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    imageStyle:{
        width: 160,
        height:160,
        borderRadius: 5,
        left: 12,
    }
})