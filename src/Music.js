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
// import { fetchId } from '../src/GetId';
import { SEARCH_MUSIC } from '../src/api';
import { CHECK_MUSIC } from '../src/api';
// import MyTextInput from '../src/MyTextInput';

class MusicElement extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSelect: false,
            checkUrl: false,
        }
        // this.selectMusic = this.selectMusic.bind(this);
        // this.playMusic=this.playMusic.bind(this);
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
                params: id,
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
                {/* <TouchableOpacity onPress = {() =>
                    this.props.navigation.navigate("Music Player",{
                    params: item.id,
                })}> */}
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

export default class Music extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            musicId: [],
            musicName: '',
        }
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
                        onPress={() => this.searchMusic()}
                    >
                        <Text style={styles.button}>搜索</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.musicId}
                    renderItem={({item}) => <MusicElement item={item} navigation={this.props.navigation} />}
                />
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