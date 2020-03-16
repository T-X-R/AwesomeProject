import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    TextInput,
    Button,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { HOT } from '../src/api';
// import SQLite from '../SQLite';
// var s = new SQLite();
// var db;

export default class Home extends Component {
    constructor(props){
    super(props);
    this.state ={
        isLoading: true,
        dataSource: [],
        }
  }

//   componentDidMount(){
//     return fetch('https://music.163.com')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           dataSource: responseJson,
//         }, function(){

//       });
//       }).catch((error) =>{
//         console.error(error);
//       });
//   }
  

componentWillMount() {
        this.fetchData();
    }
    fetchData = () => {
        (
            async () => {
                try {
                    const res = await fetch('https://music.163.com');
                    const { dataSource } = await res.json();
                    // const res = await fetch('http://192.168.3.69:3004/event');
                    // const event = await res.json();
                    console.log(dataSource);
                    this.setState({dataSource, isLoading: false});
                } catch (err) {
                    alert(err);
                    console.error(err);
                }
            }
        )();
    };



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
        //   renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1A2225',
    },
    
})