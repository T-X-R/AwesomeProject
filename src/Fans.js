import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Echarts from 'native-echarts'
import { fetchId } from '../src/GetId';
import { USER_DETAIL } from '../src/api';

export default class Fans extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            id: [],
            fan: [],
        }
    }

    async componentDidMount() {
        await fetchId()
        .then(res =>{
            this.setState({
                id: res.account.id,
            });
        });
        await this.fetchDetail();
    }

    async fetchDetail(){
        let url = USER_DETAIL + this.state.id;
        try{
            const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult = await res.json();
            let constantData = parsedResult.profile.follows;
            this.setState({
                isLoading: false,
                fan: constantData,
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render(){
        const option = {
            title: {
                text: '粉丝变化情况',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {},
            legend: {
                data: [{
                    name: '粉丝',
                    textStyle: {
                        color: 'white'
                    }
                }],
                x: 'right',
            },
            xAxis: {
                data: ["第一周", "第二周", "第三周", "第四周"],
            },
            yAxis: {},
            series: [{
                name: '粉丝',
                type: 'line',
                data: [5, 20, 36, 10],
            }],
            textStyle: {
                color: 'white'
            }
        };
        return(
            <View style={styles.container}>
                <Text style={styles.text}>我的Id: {this.state.id}</Text>
                <Echarts option={option} height={200}/>
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
