import React, {Component} from 'react';
import {
  Button,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-navigation';
import {event} from 'react-native-reanimated';
import Message from '../message/message';
import Yourmessage from '../message/yourmessage';
import AsyncStorage from '@react-native-community/async-storage'

const arr = [
  {key: 0, name: '정영빈', message: 'ㅁㅁㅁ', owner: false},
  {key: 1, name: '정영빈', message: 'ㅋㅋㅋ', owner: false},
  {key: 2, name: 'aaa', message: 'ㅉㅉㅉㅈ', owner: true},
  {key: 3, name: '정영빈', message: '으어어어', owner: false},
  {key: 4, name: '정영빈', message: '이이이잉ㅇ', owner: false},
  {key: 5, name: 'aaa', message: '나는나는', owner: true},
  {key: 6, name: 'aaa', message: '너너너너', owner: true},
  {key: 7, name: '정영빈', message: '너너나나나나나', owner: false},
  {key: 8, name: '정영빈', message: 'ㅋㅋㅋㅋㅋㅋㅋㅋ', owner: false},
  {key: 9, name: 'aaa', message: '퉁ㅁㄴㅇ', owner: true},
  {key: 10, name: 'aaa', message: 'ㅁㅁㅁ', owner: true},
  {key: 11, name: 'aaa', message: 'ㅋㅋㅋ', owner: true},
  {key: 12, name: '정영빈', message: 'ㅉㅉㅉㅈ', owner: false},
  {key: 13, name: '정영빈', message: '으어어어', owner: false},
  {key: 14, name: '정영빈', message: '이이이잉ㅇ', owner: false},
  {key: 15, name: 'aaa', message: '나는나는', owner: true},
  {key: 16, name: '정영빈', message: '너너너너', owner: false},
  {key: 17, name: '정영빈', message: '너너나나나나나', owner: false},
  {key: 18, name: 'aaa', message: 'ㅋㅋㅋㅋㅋㅋㅋㅋ', owner: true},
  {key: 19, name: '정영빈', message: '퉁ㅁㄴㅇ', owner: false},
  {key: 20, name: '정영빈', message: 'ㅁㅁㅁ', owner: false},
  {key: 21, name: 'aaa', message: 'ㅋㅋㅋ', owner: true},
  {key: 22, name: '정영빈', message: 'ㅉㅉㅉㅈ', owner: false},
  {key: 23, name: '정영빈', message: '으어어어', owner: false},
  {key: 24, name: '정영빈', message: '이이이잉ㅇ', owner: false},
  {key: 25, name: 'aaa', message: '나는나는', owner: true},
  {key: 26, name: '정영빈', message: '너너너너', owner: false},
  {key: 27, name: 'aaa', message: '너너나나나나나', owner: true},
  {key: 28, name: '정영빈', message: 'ㅋㅋㅋㅋㅋㅋㅋㅋ', owner: false},
  {key: 29, name: '정영빈', message: '퉁ㅁㄴㅇ', owner: false},
  {key: 30, name: '정영빈', message: 'ㅁㅁㅁ', owner: false},
  {key: 31, name: '정영빈', message: 'ㅋㅋㅋ', owner: false},
  {key: 32, name: 'aaa', message: 'ㅉㅉㅉㅈ', owner: true},
  {key: 33, name: 'aaa', message: '으어어어', owner: true},
  {key: 34, name: '정영빈', message: '이이이잉ㅇ', owner: false},
  {key: 35, name: '정영빈', message: '나는나는', owner: false},
  {key: 36, name: '정영빈', message: '너너너너', owner: false},
  {key: 37, name: 'aaa', message: '너너나나나나나', owner: true},
  {key: 38, name: 'aaa', message: 'ㅋㅋㅋㅋㅋㅋㅋㅋ', owner: true},
  {
    key: 39,
    name: 'aaa',
    message:
      '퉁ㅁㄴㅇ 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ v v 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ v v 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ 퉁ㅁㄴㅇ',
    owner: true,
  },
  {key: 40, name: '정영빈', message: 'ㅁㅁㅁ', owner: false},
];

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0.2),
      position: new Animated.ValueXY({x: 0, y: 0}),
      animatedValue: new Animated.Value(500),
      height: 0,
      id: 'jybin96',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('login_onoff', (err, result) => {
      const user_info = JSON.parse(result)
        console.log(result);
    })

  }

  _fadeIn() {
    Animated.timing(this.state.value, {
      toValue: 1,
      duration: 3000,
      //easing : Easing.bounce,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }
  startAnimation = () => {
    Animated.timing(this.state.animatedValue, {
      duration: 2000,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };
  _getStyle() {
    return {
      width: 100,
      height: 100,
      backgroundColor: 'red',
      opacity: this.state.value,
    };
  }
  find_dimesions(layout) {
    const {x, y, width, height} = layout;
    console.log(x);
    console.log(y);
    console.log(width);
    console.log(height);
    this.setState({
      animatedValue: new Animated.Value(height),
    });
  }
  change = () => {
    this.startAnimation();
    this._fadeIn();
  };
  rendermessage = ({item, index}) => {
    if (item.name === this.state.id) {
      return <Mymessage message={item.message} />;
    } else {
      return <Yourmessage message={item.message} />;
    }
  };
  render() {
    return (
      <SafeAreaView
        style={styles.Container_main}
        onLayout={(event) => {
          this.find_dimesions(event.nativeEvent.layout);
        }}>
        <SafeAreaView
          style={{position: 'absolute', height: '100%', width: '100%'}}>
          <Animated.View style={{flex: 1, opacity: this.state.value}}>
            <FlatList
              keyExtractor={(item) => item.key.toString()}
              data={arr.slice(this.state.start, arr.length)} //여기서
              renderItem={this.rendermessage}
              style={{flex: 1}}
            />
          </Animated.View>
        </SafeAreaView>
        <Animated.View
          style={{
            backgroundColor: 'transparent',
            height: this.state.animatedValue,
          }}>
          <View style={{flex: 0.2}}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 20, color: '#f05052', fontFamily: 'Jalnan'}}>
                창원대 소통앱
              </Text>
            </View>
            <View style={{flex: 0.5, alignItems: 'center'}}>
              <Text
                style={{fontSize: 40, color: '#f05052', fontFamily: 'Jalnan'}}>
                와글 와글
              </Text>
            </View>
          </View>
          <View style={{flex: 0.7}}></View>
          <View>
          <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={this.change}>
              <Text
                style={{
                  fontFamily: 'Jalnan',
                  fontSize: 20,
                  color: 'blue',
                }}>
                전체 채팅 참여하기
              </Text>
            </TouchableOpacity>
            {/* <Button style = {styles.Button_main} title="전체채팅참여하기" onPress={this.change}/> */}
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Container_main: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#c7d9ff',
    flexDirection: 'column',
  },
  Button_main: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
});
