import React, { Component } from 'react';
import { 
    Text, 
    View,
    Image,
    StyleSheet,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    RefreshControl,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { SEARCH_MUSIC } from '../src/api';
import { CHECK_MUSIC } from '../src/api';
import { SEARCH_MUSIC2 } from '../src/api';
import { MUSIC_DETAIL2 } from '../src/api';
import { MUSIC_VKEY } from '../src/api';

//网易云音乐
class MusicElement extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSelect: false,
            checkUrl: false,
        }
        this.selectMusic = this.selectMusic.bind(this);
        this.playMusic=this.playMusic.bind(this);
    }

    selectMusic(){
        if(this.state.isSelect == false){
            this.setState({
                isSelect: true,
            });
        } else{
            this.setState({
                isSelect: false,
            });
        }
    }

    componentDidMount() {
        const item = this.props.item;
        this.checkMusic(item.id);
    }

    playMusic(id){
        if(this.state.checkUrl == true){
            this.props.navigation.navigate("Music Player",{
                musicId: id,
                code: 1,
                url: '',
            });
            // alert(id);
        } else{
            alert('没有版权!');
        }
    }
    
    async checkMusic(id){
        // this.selectMusic();
        let url = CHECK_MUSIC + id;
        try{
            const res2 = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult2 = await res2.json();
            let constantData2 = parsedResult2.success;
            this.setState({
                checkUrl: constantData2,
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
                <TouchableOpacity onPress = {()=> this.playMusic(item.id)}>
                    <View>
                        <Text style={styles.text}>{item.id}</Text>
                        <Text style={styles.text}>{item.name}</Text>
                        {/* <Text style={styles.text}>{item.artists.name}</Text> */}
                        <Text style={styles.text}>音乐是否可用：{JSON.stringify(this.state.checkUrl)}</Text>
                        <Text style={styles.text}>选中状态：{JSON.stringify(this.state.isSelect)}</Text>
                        <Text></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

//QQ音乐
class MusicElement2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSelect2: false,
            playUrl: '',
        }
        this.selectMusic2 = this.selectMusic2.bind(this);
        this.playMusic2=this.playMusic2.bind(this);
    }

    selectMusic2(){
        if(this.state.isSelect2 == false){
            this.setState({
                isSelect2: true,
            });
        } else{
            this.setState({
                isSelect2: false,
            });
        }
    }

    componentDidMount() {
        const item = this.props.item;
        this.getMusicUrl(item.mid);
    }

    // playMusic2(id){
    //     if(this.state.checkUrl2 == true){
    //         this.props.navigation.navigate("Music Player",{
    //             musicId: id,
    //         });
    //         // alert(id);
    //     } else{
    //         alert('没有版权!');
    //     }
    // }

    playMusic2(item){

        this.props.navigation.navigate("Music Player",{
            musicId: item.mid,
            code: 2,
            url: this.state.playUrl,
        });
           
    }
    
    async getMusicUrl(id){
        let url = MUSIC_VKEY + id;
        try{
            const res3 = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult3 = await res3.json();
            let constantData3 = parsedResult3.response.playLists[0];
            this.setState({
                playUrl: constantData3,
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
                <TouchableOpacity onPress = {()=> this.playMusic2(item)}>
                    <View>
                        <Text style={styles.text}>{item.mid}</Text>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{this.state.playUrl}</Text>
                        {/* <Text style={styles.text}>{item.artists.name}</Text> */}
                        <Text style={styles.text}>选中状态：{JSON.stringify(this.state.isSelect2)}</Text>
                        <Text></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class Music extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            isLoading2: true,
            musicId: [],
            musicId2: [],
            musicName: '',
        }
        this.updateTextInput = this.updateTextInput.bind(this);
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    // async componentDidMount() {
    //     // await fetchId()
    //     // .then(res =>{
    //     //     this.setState({
    //     //         id: res.account.id,
    //     //     });
    //     // });
    //     await this.searchMusic();
    // }

    // componentDidMount() {
    //     this.searchMusic();
    // }
    

    async searchMusic(){
        let url = SEARCH_MUSIC + this.state.musicName;
        try{
            const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult = await res.json();
            let constantData = parsedResult.result.songs;
            this.setState({
                isLoading: false,
                musicId: constantData,
            });
            
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    async searchMusic2(){
        let url = SEARCH_MUSIC2 + this.state.musicName;
        try{
            const resQ = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResultQ = await resQ.json();
            let constantDataQ = parsedResultQ.response.data.song.list;
            this.setState({
                isLoading2: false,
                musicId2: constantDataQ,
            });
            
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

// headerTab () {
//     return (
//         <ScrollableTabView
//             initialPage={0}
//             tabBarActiveTextColor='white'
//             tabBarInactiveTextColor='#777777'
//             tabBarTextStyle={{fontSize: 15}}
//             tabBarUnderlineStyle={styles.underlineStyle}
//         >
//             <Text tabLabel='网易云音乐'></Text>
//             <Text tabLabel='QQ音乐'></Text>
//         </ScrollableTabView>
//     )
// }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Image source={require('../pic/search.png')} style={styles.icon}/>
                    <TextInput style={styles.inputKeywords} 
                        placeholder="请输入歌曲名称" 
                        placeholderTextColor = "#fff"
                        onChangeText={(text) => this.updateTextInput(text, 'musicName')}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPressIn={() => this.searchMusic()}
                        onPressOut={() => this.searchMusic2()}
                    >
                        <Text style={styles.button}>搜索</Text>
                    </TouchableOpacity>
                </View>
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
                            data={this.state.musicId}
                            renderItem={({item}) => <MusicElement item={item} navigation={this.props.navigation} />}
                        />
                    </View>
                    <View tabLabel='QQ音乐'>
                        <FlatList
                            style={{top: 8}}
                            data={this.state.musicId2}
                            renderItem={({item}) => <MusicElement2 item={item} navigation={this.props.navigation} />}
                        />
                    </View>
                    {/* <Text tabLabel='QQ音乐'></Text> */}
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
        marginBottom: 10,
    },
    text:{
        color: 'white',
        fontSize: 15,
    },
    underlineStyle: {
        height: 2,
        backgroundColor: 'white',
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
    button: {
        fontSize: 14,
        fontWeight:"500",
        color: "#fff",
        backgroundColor:"#5FE090",
        width: 65,
        height: 38,
        paddingTop: 12,
        paddingLeft: 17,
        marginTop: 15,
        marginLeft: 25,
    },
    icon: {
        marginTop: 20,
        marginLeft: 15,
    }
})