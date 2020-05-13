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
import { MUSIC_DETAIL } from '../src/api';
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
            imgUrl: '',
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

    async componentDidMount() {
        const item = this.props.item;
        await this.getMusicDetaill(item.id)
        await this.checkMusic(item.id);
    }

    playMusic(item){
        if(this.state.checkUrl == true){
            this.props.navigation.navigate("Music Player",{
                musicId: item.id,
                musicName: item.name,
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

    async getMusicDetaill(id){
        let url = MUSIC_DETAIL + id;
        try{
            const res3 = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult3 = await res3.json();
            let getImgUrl = parsedResult3.songs[0].al.picUrl;
            this.setState({
                imgUrl: getImgUrl,
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
                <TouchableOpacity onPress = {()=> this.playMusic(item)}>
                    <View style={styles.container2}>
                        <Image source={{url: this.state.imgUrl}} style={styles.imageStyle}/>
                        <View style={styles.container3}>
                            <Text style={styles.text} numberOfLines={1}>歌曲名：{item.name}</Text>
                            <Text style={styles.text} numberOfLines={1}>作者：{item.artists[0].name}</Text>
                            <Text style={styles.text} numberOfLines={1}>专辑：{item.album.name}</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.alias[0]}</Text>
                        </View>   
                    </View>
                </TouchableOpacity>
                <Text></Text>
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
            checkVkey: '',
            imgUrl2: '',
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

    playMusic2(item){
        if(this.state.checkVkey != ''){
            this.props.navigation.navigate("Music Player",{
                musicId: item.mid,
                musicName: item.name,
                code: 2,
                url: this.state.playUrl,
            });
        } else if(this.state.checkVkey == ''){
            alert('需要Vip登录!');
        }
           
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
            let checkUrlData = parsedResult3.response.req_0.data.midurlinfo[0].vkey;
            this.setState({
                playUrl: constantData3,
                checkVkey: checkUrlData,
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
                    <View style={styles.container2}>
                        <Image source={require('../pic/music.jpg')} style={styles.imageStyle}/>
                        <View style={styles.container3}>
                            <Text style={styles.text} numberOfLines={1}>歌曲名：{item.name}</Text>
                            <Text style={styles.text} numberOfLines={1}>作者：{item.singer[0].name}</Text>
                            <Text style={styles.text} numberOfLines={1}>专辑：{item.album.title}</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.subtitle}</Text>
                        </View>   
                    </View>
                </TouchableOpacity>
                <Text></Text>
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
        // marginBottom: 10,
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
    },
    imageStyle:{
        width: 160,
        height:160,
        borderRadius: 5,
        left: 12,
    }
})