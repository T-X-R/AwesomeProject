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
import Reactotron from "reactotron-react-native";

let sqlite = new SQLite();
sqlite.initDB();
// var callbackData = [];
// sqlite.selectData(music);

export default class Collection extends Component {
  constructor(props){
    super(props);
    this.state = {
      musicName: '',
      musicId: '',
      musicUrl: '',
      code: '',
      dataSource: [],
    }
  }

compennetDidUnmount(){
  sqlite.closeDB();
}

componentWillMount(){
  sqlite.selectData("COLLECT")
}

// selectM(){
//   // db.transaction((tx) => {
//   //     tx.executeSql('SELECT * FROM COLLECT', [], (tx, result) => {
//   //       let arr = []
//   //       for (let i = 0; i < result.rows.length; i++) {
//   //         arr.push(result.rows.item(i))
//   //       }
//   //       this.setState({
//   //         dataSource: arr,
//   //       })
//   //       Reactotron.log(dataSource);
//   //     })
//   //   },(error)=>{
//   //     Reactotron.log(error);
//   //   });
//     db.transaction((tx)=>{
//             tx.executeSql("select * from COLLECT", [],(tx,results)=>{
//                 var len = results.rows.length;
//                 for(let i=0; i<len; i++){
//                     var u = results.rows.item(i);
//                     this.setState({
//                         musicName: u.musicName,
//                         musicId: u.musicId,
//                         musicUrl: u.playUrl,
//                         code: u.code,
//                     });
//                 }
//             });
//         },(error)=>{
//             Reactotron.log(error);
//         });
// }

  render () {

    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View>
            {/* <FlatList
              style={{top: 8}}
              data={this.state.dataSource}
              renderItem={({item}) => 
                <TouchableOpacity>
                  <View style={styles.container2}>
                    <Text></Text>
                    <Text style={styles.text}>{item[0]}</Text>
                    <Text style={styles.text}>{item[1]}</Text>
                    <Text style={styles.text}>{item[2]}</Text>
                    <Text style={styles.text}>{item[3]}</Text>
                    <Text style={styles.text}>{item[4]}</Text>
                    <Text></Text>
                  </View>
                </TouchableOpacity>
              }
            /> */}
            <Text>{this.state.musicName}</Text>
            <Text>{this.state.musicId}</Text>
            <Text>{this.state.musicUrl}</Text>
            <Text>{this.state.code}</Text>
          </View>
        </TouchableOpacity>
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
      left: 25,
      top: 20,
    },
    text:{
        color: 'white',
        fontSize: 15,
    },
})