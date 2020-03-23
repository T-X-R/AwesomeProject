import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
// import { LOGIN } from '../src/api';
import { fetchId } from '../src/GetId';
import { USER_PLAYLIST } from '../src/api';

export default class PlayList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            // dataSource: [],
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



    // componentDidMount() {
    //     this.fetchPlaylist();
    // }

    // async fetchData() {
    //     try {
    //         const res = await fetch(LOGIN, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //         });
    //         const parsedResult = await res.json();
    //         // debugger
    //         let constantData = parsedResult.account.id;
            
    //         // debugger

    //         this.setState({
    //             isLoading: false,
    //             dataSource: constantData, 
    //         });
    //     } catch (err) {
    //         alert(err);
    //         console.error(err);
    //     }
    // };

    async fetchPlaylist(){
        // let url = USER_PLAYLIST + this.state.dataSource;
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
            // debugger
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.id}</Text>
                <ScrollView style={styles.scroll}>
                {/* <Text style={styles.text}>{JSON.stringify(this.state.dataSource)}</Text> */}
                <FlatList
                    data={this.state.playList}
                    renderItem={({item})=>
                    <View>
                        <Text style={styles.text}>{item.name}</Text>
                        {/* <Text style={styles.text}>{item.id}</Text> */}
                    </View>
                    }
                    // refreshControl={
                    //     <RefreshControl
                    //     refreshing = {this.state.refreshing}
                    //     onRefresh={this._onRefresh.bind(this)}
                    //     />
                    // }
                />
                </ScrollView>
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
})