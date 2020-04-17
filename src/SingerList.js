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
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { HOT } from '../src/api';
// import SQLite from '../SQLite';
// var s = new SQLite();
// var db;

export default class SingerList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        }
    } 

componentDidMount() {
    this.fetchData();
}

async fetchData() {
    try {
        const res = await fetch(HOT, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const parsedResult = await res.json();
        let constantData = parsedResult.list.artists;
        this.setState({
            isLoading: false,
            dataSource: constantData, 
        });
    } catch (err) {
        alert(err);
        console.error(err);
    }
  };

  _onRefresh(){
		this.setState({refreshing: true});
		this.fetchData().then(() =>{
			this.setState({refreshing: false})
		});
	}

  render(){
    return(
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {/* <Text style={styles.text}>{JSON.stringify(this.state.dataSource)}</Text> */}
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item})=>
                    <View>
                        <Text style={styles.text}>{item.name}</Text>
                        {/* <Text style={styles.text}>{item.id}</Text> */}
                    </View>
                    }
                    refreshControl={
                        <RefreshControl
                        refreshing = {this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        />
                    }
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
    scroll:{
        flex: 1,
    },
})