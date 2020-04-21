import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
// import Dropdownmenu from 'react-native-dropdownmenus';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { TOP_LIST } from '../src/api';
import { PLAYLIST_DETAIL } from '../src/api';
import { TOP_LIST2 } from '../src/api';

class Top extends Component {
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
                    <View>
                        <Text style={styles.text}>{item.name}</Text>
                        {/* <Text style={styles.text}>{item.coverImgUrl}</Text> */}
                        <Text style={styles.text}>{item.id}</Text>
                        <Text></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class Top2 extends Component {
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
            <View>
                {/* <TouchableOpacity onPress = {()=> this.playMusic(item.id)}> */}
                    {/* <View> */}
                        <Text style={styles.text}>{item.topTitle}</Text>
                        <Text style={styles.text}>{item.picUrl}</Text>
                        <Text></Text>
                    {/* </View> */}
                {/* </TouchableOpacity> */}
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
                            renderItem={({item}) => <Top item={item} navigation={this.props.navigation}/>}
                        />
                    </View>
                    <View tabLabel='QQ音乐'>
                        <FlatList
                            style={{top: 8}}
                            data={this.state.dataSourceQ}
                            renderItem={({item}) => <Top2 item={item} />}
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
    text:{
        color: 'white',
        fontSize: 15,
    },
    underlineStyle: {
        height: 2,
        backgroundColor: 'white',
    },
})