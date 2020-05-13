import React, { Component } from 'react';
import { 
    Text, 
    View,
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { fetchId } from '../src/GetId';
import { USER_PLAYLIST } from '../src/api';

export default class PlayList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            id: [],
            playList: [],
        }
    }

    async componentDidMount() {
        await fetchId()
        .then(res =>{
            this.setState({
                id: res.account.id,
            });
        });
        await this.fetchPlaylist();
    }

    async fetchPlaylist(){
        let url = USER_PLAYLIST + this.state.id;
        try{
            const res2 = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult2 = await res2.json();
            let constantData2 = parsedResult2.playlist;
            this.setState({
                isLoading: false,
                playList: constantData2, 
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render(){
        return(
            <View style={styles.container}>
                    <FlatList
                        data={this.state.playList}
                        renderItem={({item})=>
                            <TouchableOpacity onPress={()=>{
                                    this.props.navigation.navigate('网易云歌单', {
                                        listId: item.id,
                                    });
                                }
                            }>
                                <View style={styles.container2}>
                                    <Image source={{url: item.coverImgUrl}} style={styles.imageStyle}/>
                                    <View style={styles.container3}>
                                        <Text style={styles.text} numberOfLines={1}>歌单：{item.name}</Text>
                                        <Text/>
                                        <Text style={styles.text} numberOfLines={1}>创建者：{item.creator.nickname}</Text>
                                    </View>
                                </View>
                                <Text/>
                            </TouchableOpacity>
                        }
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
        top: 10,
        flexDirection:'row',
    },
    container3: {
        flexDirection:'column',
        marginLeft: 50,
        justifyContent: 'center',
        width: 200,
    },
    text:{
        color: 'white',
        fontSize: 16,
    },
    imageStyle:{
        width: 160,
        height:160,
        borderRadius: 5,
        left: 12,
    }
})