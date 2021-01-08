import React, {Component} from 'react';
import {
  Button,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-navigation';
import {event} from 'react-native-reanimated';
import Message from '../message/message';
import Main_Mymessage from './main_mymessage';
import Main_Yourmessage from './main_yourmessage';
import AsyncStorage from '@react-native-community/async-storage';
// import { post } from '../server/routes/indexswy';
const func = require('../server/api');
import io from 'socket.io-client';
const socket = io(func.api(3001, ''));

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Animated.Value(0.2),
      position: new Animated.ValueXY({x: 0, y: 0}),
      animatedValue: new Animated.Value(500),
      animatedValue_back: new Animated.Value(1),
      // animation: new Animated.Value(0),
      height: 0,

      user_key: '',
      user_nickname: '',
      message: '',
      messages: [],

      my_all_message: '',
      my_all_message_time: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const user_info = JSON.parse(result);
      // console.log(user_info);
      this.setState({user_key: user_info.user_key});
      this.setState({user_nickname: user_info.user_nickname});
    });

    fetch(func.api(3002, 'Allchatroom_message'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        json.map((rows, index) => {
          const message_data = {
            key: rows.allmessage_key,
            message_body: rows.allmessage_body,
            user_nickname: rows.user_nickname,
            user_key: rows.user_key,
            allmessage_time: rows.allmessage_time,
          };
          this.setState({
            messages: [...this.state.messages, message_data],
          });
        });
      });

    socket.on('recieve_allchatroom_message', (data) => {
      // console.log("받은 데이터" + data);
      this.setState({
        messages: [...this.state.messages, data],
      });
    });
  }

  sendmessage = () => {
    const message_data = {
      user_key: this.state.user_key,
      my_all_message: this.state.my_all_message,
    };

    fetch(func.api(3002, 'My_all_message_save'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(message_data),
    })
      .then((res) => res.json())
      .then((json) => {
        const time = json.allmessage_time;
        this.setState({
          my_all_message_time: time,
        });

        const user_message_data = {
          user_key: this.state.user_key,
          user_nickname: this.state.user_nickname,
          message_body: this.state.my_all_message,
          allmessage_time: this.state.my_all_message_time,
        };
        console.log(user_message_data);
        socket.emit('send_allchatroom', user_message_data);

        this.setState({
          my_all_message: '',
        });
      });
  };

  ///////////////////////////////////////////////////////////////////////////////

  allchatroom_message = (e) => {
    const startAnimation1 = Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    });

    const startAnimation2 = Animated.timing(this.state.animatedValue_back, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
    });

    Animated.parallel([startAnimation1, startAnimation2]).start();

    this._fadeIn();
  };

  _fadeIn() {
    Animated.timing(this.state.value, {
      toValue: 1,
      duration: 3000,
      //easing : Easing.bounce,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }
  // startAnimation = () => {
  //   Animated.timing(this.state.animatedValue, {
  //     duration: 2000,
  //     toValue: 0,
  //     useNativeDriver: false,
  //   }).start();
  // };
  // _getStyle() {
  //   return {
  //     width: 100,
  //     height: 100,
  //     backgroundColor: 'red',
  //     opacity: this.state.value,
  //   };
  // }
  find_dimesions(layout) {
    const {x, y, width, height} = layout;
    // console.log(x);
    // console.log(y);
    // console.log(width);
    // console.log(height);
    this.setState({
      animatedValue: new Animated.Value(height),
    });
  }

  //////////////////////////////////////////////////////////////////////////

  rendermessage = ({item, index}) => {
    let send_time = new Date(item.allmessage_time);
    let send_time_hour = send_time.getHours();
    let send_time_minute = send_time.getMinutes(); //+9
    let message_time = '';

    if (send_time_hour + 9 == 12) {
      if (send_time_minute < 10) {
        message_time =
          '오후 ' +
          JSON.stringify(send_time_hour + 9) +
          ':0' +
          JSON.stringify(send_time_minute);
      } else if (send_time_minute > 10) {
        message_time =
          '오후 ' +
          JSON.stringify(send_time_hour + 9) +
          ':' +
          JSON.stringify(send_time_minute);
      }
    } else if ((send_time_hour + 9) % 24 < 12) {
      if (send_time_minute < 10) {
        message_time =
          '오전 ' +
          JSON.stringify((send_time_hour + 9) % 24) +
          ':0' +
          JSON.stringify(send_time_minute);
      } else if (send_time_minute > 10) {
        message_time =
          '오전 ' +
          JSON.stringify((send_time_hour + 9) % 24) +
          ':' +
          JSON.stringify(send_time_minute);
      }
    } else if ((send_time_hour + 9) % 24 > 12) {
      if (send_time_minute < 10) {
        message_time =
          '오후 ' +
          JSON.stringify(((send_time_hour + 9) % 24) - 12) +
          ':0' +
          JSON.stringify(send_time_minute);
      } else if (send_time_minute > 10) {
        message_time =
          '오후 ' +
          JSON.stringify(((send_time_hour + 9) % 24) - 12) +
          ':' +
          JSON.stringify(send_time_minute);
      }
    }

    if (item.user_nickname === this.state.user_nickname) {
      return <Main_Mymessage message={item.message_body} time={message_time} />;
    } else {
      return (
        <Main_Yourmessage
          nickname={item.user_nickname}
          message={message_time}
          time={item.allmessage_time}
        />
      );
    }
  };

  backBtn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Main');
  };

  render() {
    return (
      <SafeAreaView style={styles.Container_main}>
        <SafeAreaView
          style={styles.Container_main}
          onLayout={(event) => {
            this.find_dimesions(event.nativeEvent.layout);
          }}>
          <SafeAreaView
            style={{position: 'absolute', height: '100%', width: '100%'}}>
            <Animated.View style={{flex: 1, opacity: this.state.value}}>
              <TouchableOpacity onPress={this.backBtn}>
                <View style={{position: 'absolute', marginTop: 7, left: '2%'}}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./backbutton.png')}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}>
                <Text
                  style={{fontFamily: 'Jalnan', color: 'black', fontSize: 20}}>
                  전체 채팅방
                </Text>
              </View>
              <View style={{flex: 1}}>
                <FlatList
                  keyExtractor={(item) => item.key.toString()}
                  data={this.state.messages}
                  renderItem={this.rendermessage}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TextInput
                  value={this.state.my_all_message}
                  id="my_all_message"
                  onChangeText={(text) => this.setState({my_all_message: text})}
                  style={styles.text_input}
                />
                <TouchableOpacity
                  style={styles.text_input_image}
                  onPress={this.sendmessage}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./sendmessage.png')}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </SafeAreaView>

          <Animated.View
            style={{
              backgroundColor: 'transparent',
              height: this.state.animatedValue,
              opacity: this.state.animatedValue_back,
            }}>
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 40,
                    color: '#f05052',
                    fontFamily: 'Jalnan',
                  }}>
                  와글 와글
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontSize: 18, color: '#f05052', fontWeight: 'bold'}}>
                  다른학과 사람들과 친해질 수 있는
                </Text>
                <Text
                  style={{fontSize: 18, color: '#f05052', fontWeight: 'bold'}}>
                  최고의 방법
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f05052',
                  paddingLeft: 40,
                  paddingRight: 40,
                  paddingBottom: 13,
                  paddingTop: 13,
                  borderRadius: 28,
                  shadowOpacity: 0.3,
                  elevation: 3,
                }}
                onPress={this.allchatroom_message}>
                <Text
                  style={{fontFamily: 'Jalnan', fontSize: 17, color: 'white'}}>
                  전체 채팅 참여하기
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Container_main: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  Button_main: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },

  text_input_bg: {},
  text_input: {
    display: 'flex',
    height: 35,
    width: 330,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#dcdcdc82',
    borderRadius: 24,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text_input_image: {
    display: 'flex',
    marginTop: 5,
    marginLeft: 20,
  },
});
