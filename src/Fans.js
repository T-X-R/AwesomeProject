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
import Reactotron from 'reactotron-react-native';
import Echarts from 'native-echarts'
import { fetchId } from '../src/GetId';
import { USER_DETAIL } from '../src/api';
var fan = [];
for (var i = 0; i < 5; i++) {
    fan.push(0);
}
var date = new Date();
var time = (date.getMonth()+1).toString() + '/' + date.getDate().toString();
var dateTime = [];
if(dateTime.length <5){
    dateTime.push(time);
} else {
    dateTime.shift();
    dateTime.push(time);
}
// dateTime.push(time)

export default class Fans extends Component {
    constructor(props){
        super(props);
        var timer = null;
        this.state = {
            // isLoading: true,
            id: [],
            // fan: [],
        }
    }

    async componentDidMount(){
        await fetchId().then(res =>{
            this.setState({
                id: res.account.id,
            });
        });
        // await this.fetchDetail();
        // this.timer = setInterval(
        // ()=>{
        //     this.fetchDetail();
        //     Reactotron.log(fan);
        // },
        // 10000);
    } 

    timer = setInterval(
        ()=>{
            this.fetchDetail();
            // Reactotron.log(fan);
        },
    43200000);


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
            for (var i = 0; i < 5; i++) {
                fan.shift();
                fan.push(constantData);
            }
            // Reactotron.log(fan)
            
            // for (var i = 0; i < 5; i++) {
            //     fan.shift(); //删除数组第一个元素
            //     fan.push(constantData);
            // }
            // myChart.setOption({
            //     series: [{
            //         data: fan,
            //     }]
            // });
        
            // this.setState({
            //     isLoading: false,
            //     fan: constantData,
            // });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render(){
        const option = {
            title: {
                text: '粉丝数据信息',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: 'axis',
                // formatter: function () {
                //     var date = new Date();
                //     return (date.getMonth()+1).toString() + '/' + date.getDate().toString();
                // },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: false
                },
                data: dateTime,
            },
            yAxis: {
                type: 'value',
                boundaryGap: true,
                splitLine: {
                    show: false,
                },
            },
            axisLabel: { 
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'white'
                }
            },
            line: {
                itemStyle: {
                    normal: {
                        color: 'white',
                        lineStyle: {
                            width: 2,
                            type: 'solid',
                            shadowColor : 'rgba(0,0,0,0)', //默认透明
                        }
                    },
                },
            },
            series: [{
                name: '粉丝数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: fan,
                color: 'white',
            }]
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
