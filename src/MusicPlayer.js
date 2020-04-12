import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    Slider,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Animated,
    Easing
} from 'react-native'
import Video from 'react-native-video'
import { MUSIC_URL } from '../src/api';
import { MUSIC_DETAIL } from '../src/api';
import { MUSIC_LYRIC } from '../src/api';
var myAnimate;
var lyrObj = [];
 
 
export default class MusicPlayer extends Component{
    constructor(props){
        super(props);
        this.spinValue = new Animated.Value(0);
        this.player = ''
        this.state = {
            musicId: '',
            musicUrl: '',
            paused: false,
            duration: 0.0,
            slideValue: 0.0,
            currentTime: 0.0,
            currentIndex: 0,
            playMode: 0,
            playIcon: require('../pic/pause.png'),
            lyric: [],
        }
    }

    async componentDidMount() {
        // let id = navigation.getParam("params");
        let id = this.props.navigation.state.params.id;
        debugger
        this.setState({
            musicId: id,
        })
        await this.fetchMusicUrl();
        await this.fetchLyric();
        this.spin(); 
    }

    formatMediaTime(duration) {
        let min = Math.floor(duration / 60)
        let second = duration - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    setDuration(duration) {
        this.setState({duration: duration.duration})
    }

    setTime(data) {
        let sliderValue = parseInt(this.state.currentTime)
        this.setState({
            slideValue: sliderValue,
            currentTime: data.currentTime
        })
    }

    onEnd(data) {
        // this.showMessageBar('亲！')('已帮你切换到下一首')('fuccess')
        // if (this.state.playMode === 0) {
        //   this.nextSong(this.state.currentIndex + 1)
        // } else if (this.state.playMode === 1) {
        //   this.player.seek(0)
        // } else {
        //   this.nextSong(Math.floor(Math.random() * this.musicList.length))
        // }
        this.player.seek(0)
    }
    
    spin() {
        this.spinValue.setValue(0)
        myAnimate = Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    musicPlay() {
        this.setState({
            pause: !this.state.pause
        })
        //判断按钮显示什么
        if(this.state.pause == true){
            this.setState({
                playIcon: require('../pic/pause.png')//播放
            })
        }else {
            this.setState({
                playIcon: require('../pic/play.png')//暂停
            })
        }
    }

    renderItem() {
        // 数组
        var itemAry = [];
        for (var i = 0; i < lyrObj.length; i++) {
            var item = lyrObj[i].txt
            if (this.state.currentTime.toFixed(2) > lyrObj[i].total) {
                //正在唱的歌词
                itemAry.push(
                    <View key={i} style={styles.lyricTxt}>
                        <Text style={{ fontSize: 15, color: '#EBEBEB' }}>{item}</Text>
                    </View>
                );
                _scrollView.scrollTo({x: 0, y:(25 * i), animated:false});
            }
            else {
                //所有歌词
                itemAry.push(
                    <View key={i} style={styles.lyricTxt}>
                        <Text style={{ fontSize: 15, color: '#757575' }}>{item}</Text>
                    </View>
                )
            }
        }
        return itemAry;
    }

    async fetchMusicUrl(){
        let url = MUSIC_URL + this.state.musicId;
        try{
            const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult = await res.json();
            let constantData = parsedResult.data[0].url;
            this.setState({
                musicUrl: constantData,
            });
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    async fetchLyric(){
        let url = MUSIC_LYRIC+ this.state.musicId;
        try{
            const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const parsedResult2 = await res.json();
            let constantData2 = parsedResult2.lrc.lyric;
            this.setState({
                lyric: constantData2,
            });

            let lryAry = this.state.lyric.split('\n')   //按照换行符切数组
            lryAry.forEach(function (val, index) {
                var obj = {}   //用于存放时间
                /*
                    ^表示字符串必须以后面的规则开头, 在这里就是说字符串必须以\s*开头.
                    \s 是空格的意思, * 表示有0个或多个
                    \s* 就是有0个或多个空格
                    (^\s*) 表示的就是以0个空格或者多个空格开头
                    | 表示或的意思, 也就是满足| 左边的也成立, 满足 | 右面的也成立.
                    \s*前面说过了
                    $ 的意思是字符串必须以前面的规则结尾
                    (\s*$) 的意思就是, 以0个空格或者多个空格结尾
                    /.../g  是正则表达式的属性, 表示全文匹配, 而不是找到一个就停止.
                */ 
                val = val.replace(/(^\s*)|(\s*$)/g, '')    //正则,去除前后空格并用空字符串代替
                let indeofLastTime = val.indexOf(']')  // ]的下标
                let timeStr = val.substring(1, indeofLastTime) //把时间切出来 0:04.19
                let minSec = ''
                let timeMsIndex = timeStr.indexOf('.')  // .的下标
                minSec = timeStr.substring(1, val.indexOf('.'))
                obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))
                // if (timeMsIndex !== -1) {
                //     //存在毫秒 0:04.19
                //     minSec = timeStr.substring(0, val.indexOf('.'))  // 0:04.
                //     obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
                // } else {
                //     //不存在毫秒 0:04
                //     minSec = timeStr
                //     obj.ms = 0
                // }
                let curTime = minSec.split(':')  // [0,04]
                obj.m = parseInt(curTime[0])   //分钟 0
                obj.s = parseInt(curTime[1])   //秒钟 04
                obj.txt = val.substring(indeofLastTime + 1, val.length) //歌词文本: 留下唇印的嘴
                obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '')
                obj.dis = false
                obj.total = obj.m * 60 + obj.s + obj.ms / 100   //总时间
                if (obj.txt.length > 0) {
                    lyrObj.push(obj)
                }
            })
        } catch (err) {
            alert(err);
            console.error(err);
        }
    };

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return(
            <View style={styles.container}>
                <Image source={require('../pic/circle.png')} style={{width:260,height:260,marginTop: 60,alignSelf:'center'}}/>
                <Animated.Image
                    ref = 'myAnimate'
                    style={{width:166,height:166,marginTop: -214,alignSelf:'center',borderRadius: 180*0.5,transform: [{rotate: spin}]}}
                    source={require('../pic/gtr.jpg')}
                />
                <Video
                    source={{uri: this.state.musicUrl}}
                    ref={video => this.player = video}
                    volume={1.0}
                    paused={this.state.pause}
                    onLoadStart={this.loadStart}
                    onLoad={data => this.setDuration(data)}
                    onProgress={(data) => this.setTime(data)}
                    onEnd={(data) => this.onEnd(data)}
                />
                <View style={styles.slideBar}>
                    <Text style={{width: 35, fontSize: 12, color: 'white', marginLeft: 5}}>{this.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                    <Slider
                        style={styles.sliderStyle}
                        value={this.state.slideValue}
                        maximumValue={this.state.duration}
                        step={1}
                        onValueChange={value => this.setState({currentTime: value})}
                        onSlidingComplete={value => this.player.seek(value)}
                        minimumTrackTintColor='#757575'
                        maximumTrackTintColor='#EBEBEB'
                        thumbImage={require('../pic/slideIcon.png')}
                    />
                    <View style={{width: 35, alignItems: 'flex-end', marginRight: 5}}>
                        <Text style={{fontSize: 12, color: 'white'}}>{this.formatMediaTime(Math.floor(this.state.duration))}</Text>
                    </View>
                </View>
                
                {/* Todo
                    实现收藏音乐 
                */}
                <View style={styles.playBar}>
                    <TouchableOpacity onPress={() => this.musicPlay()}>
                        <Image source={this.state.playIcon} style={{ width:35, height:35, left:190 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={require('../pic/like.png')} style={{ width:30, height:30, left:330, top: -5}}/>
                    </TouchableOpacity>
                </View>


                <View style={styles.lyricBar}>
                    <ScrollView 
                        style={{position:'relative'}}
                        ref={(scrollView) => { _scrollView = scrollView}}
                    >
                        {this.renderItem()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        //   alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#1A2225',
    },
    sliderStyle: {
        flex: 1,
        marginHorizontal: 5,
    },
    slideBar: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        top: 60,
    },
    playBar:{
        flexDirection:'row',
        alignItems: 'flex-end',
        // justifyContent:'center',
        top: 60,
    },
    lyricBar: {
        height:300,
        alignItems: 'center',
        top: 85,
    },
    lyricTxt: {
        // paddingTop: 20,
        height: 25,
        alignItems: 'center',
    }
})