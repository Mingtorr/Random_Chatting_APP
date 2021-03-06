import React, {PureComponent} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Main_Mymessage from './main_mymessage';
import Main_Yourmessage from './main_yourmessage';
import AsyncStorage from '@react-native-community/async-storage';
import {Dimensions} from 'react-native';
// import { post } from '../server/routes/indexswy';
const func = require('../server/api');
import io from 'socket.io-client';
const socket = io(func.api(3002, ''));

const display_Height = Dimensions.get('window').height;

export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.flatlist_ref = React.createRef();
    this.state = {
      value: new Animated.Value(0.2),
      position: new Animated.ValueXY({x: 0, y: 0}),
      animatedValue: new Animated.Value(display_Height * 0.85),
      animatedValue_back: new Animated.Value(1),
      // animation: new Animated.Value(0),
      height: 0,
      allchatroom_animate_boolean: false,

      user_key: '',
      user_nickname: '',
      message: '',
      messages: [],
      bockusers: [],
      my_all_message: '',
      chadanmessage: [],
      scroll_number: 1,
      refreshing: false,
      keyboardH: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const user_info = JSON.parse(result);
      // console.log(user_info);
      this.setState({user_key: user_info.user_key});
      this.setState({user_nickname: user_info.user_nickname});
      const data = {
        user_key: this.state.user_key,
      };
      // console.log('allchatroom_message');
      fetch(func.api(3002, 'Allchatroom_message'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          const bockusers = [];
          json.bockusers.map((value2, index2, arr2) => {
            bockusers.push(value2.bockuser_key);
          });
          const arr = Array.from(new Set(bockusers));
          this.setState({
            bockusers: arr,
          });
          if (json.allmessages !== undefined) {
            json.allmessages.map((rows, index) => {
              const message_data = {
                message_body: rows.allmessage_body,
                user_nickname: rows.user_nickname,
                user_key: rows.user_key,
                allmessage_time: rows.allmessage_time,
              };
              const itemToFind = arr.find(function (item) {
                return item === rows.user_key;
              });
              console.log(itemToFind);
              if (itemToFind === -1 || itemToFind === undefined) {
                this.setState({
                  messages: [...this.state.messages, message_data],
                });
              }
            });
          }
          this.scrolltobottom();
        });
    });

    socket.on('recieve_allchatroom_message', (data) => {
      // console.log('?????? ?????????');
      // console.log(data);
      const itemToFind = this.state.bockusers.find(function (item) {
        return item === data.user_key;
      });
      console.log(itemToFind);
      if (itemToFind === -1 || itemToFind === undefined) {
        this.setState({
          messages: [...this.state.messages, data],
        });
      }
      this.scrolltobottom();
    });

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  bockuser = (user_key, myuser_key) => {
    //?????????????????????
    const data = {
      user_key: user_key,
      myuser_key: myuser_key,
    };
    fetch(func.api(3002, 'Allmessage_bock'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        const bockusers = [];
        json.map((value2, index2, arr2) => {
          bockusers.push(value2.bockuser_key);
        });
        const arr = Array.from(new Set(bockusers));
        console.log(arr);
        this.setState({
          bockusers: arr,
        });

        const newmessages = [...this.state.messages];
        this.setState({
          chadanmessage: [],
        });
        newmessages.map((value, index, array) => {
          const itemToFind = arr.find(function (item) {
            return item === value.user_key;
          });
          console.log(itemToFind);
          if (itemToFind === -1 || itemToFind === undefined) {
            this.setState({
              chadanmessage: [...this.state.chadanmessage, value],
            });
          }
        });
        this.setState({
          messages: this.state.chadanmessage,
        });
      })
      .then((res) => res.json())
      .then((json) => {
        const bockusers = [];
        json.map((value2, index2, arr2) => {
          bockusers.push(value2.bockuser_key);
        });
        const arr = Array.from(new Set(bockusers));
        console.log(arr);
        this.setState({
          bockusers: arr,
        });

        const newmessages = [...this.state.messages];
        this.setState({
          chadanmessage: [],
        });
        newmessages.map((value, index, array) => {
          const itemToFind = arr.find(function (item) {
            return item === value.user_key;
          });
          console.log(itemToFind);
          if (itemToFind === -1 || itemToFind === undefined) {
            this.setState({
              chadanmessage: [...this.state.chadanmessage, value],
            });
          }
        });
        this.setState({
          messages: this.state.chadanmessage,
        });
      });
  };
  _keyboardDidShow = (e) => {
    // this.props.navigation.setParams({
    //     keyboardHeight: e.endCoordinates.height,
    //     normalHeight: Dimensions.get('window').height,
    //     shortHeight: Dimensions.get('window').height - e.endCoordinates.height,
    // });

    this.setState({
      keyboardH: Platform.OS === 'ios' ? e.endCoordinates.height - 50 : 0,
    });
    // console.log('open');
  };

  _keyboardDidHide = () => {
    this.setState({
      keyboardH: 0,
    });
    // console.log('hide');
  };

  sendmessage = () => {
    // console.log('sendmessage');

    if (this.state.my_all_message.trim() === '') {
      this.setState({
        my_all_message: '',
      });
    } else {
      const user_message_data = {
        user_key: this.state.user_key,
        user_nickname: this.state.user_nickname,
        message_body: this.state.my_all_message,
        allmessage_time: new Date(),
      };
      // console.log(user_message_data);
      socket.emit('send_allchatroom', user_message_data);

      this.setState({
        my_all_message: '',
      });

      this.scrolltobottom();
    }
  };

  ///////////////////////////////////////////////////////////////////////////////

  allchatroom_message = (e) => {
    // console.log('allchatroom');

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

    setTimeout(() => {
      this.setState({
        allchatroom_animate_boolean: true,
      });
    }, 300);
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

  _getdata = () => {
    const scroll_data = {
      scroll_number: this.state.scroll_number,
    };

    // console.log('????????? ?????????');
    // console.log(scroll_data);
    fetch(func.api(3002, 'Infinite_scroll'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(scroll_data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json !== undefined) {
          json.map((rows, index) => {
            const message_data = {
              key: rows.allmessage_key,
              message_body: rows.allmessage_body,
              user_nickname: rows.user_nickname,
              user_key: rows.user_key,
              allmessage_time: rows.allmessage_time,
            };
            // console.log('????????? ?????????');
            // console.log(message_data);
            const itemToFind = this.state.bockusers.find(function (item) {
              return item === rows.user_key;
            });
            console.log(itemToFind);
            if (itemToFind === -1 || itemToFind === undefined) {
              this.setState({
                messages: [message_data, ...this.state.messages],
              });
            }
          });
          this.setState({
            scroll_number: this.state.scroll_number + 1,
          });
        }
      });
  };

  // _handleRefresh = () => {
  //   this.setState({
  //     // refreshing: true,
  //     scroll_number: this.state.scroll_number + 1,
  //   }, this._getdata);
  // }

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

  // find_dimesions(layout) {
  //   const {x, y, width, height} = layout;
  //   // console.log(x);
  //   // console.log(y);
  //   // console.log(width);
  //   // console.log(height);
  //   this.setState({
  //     animatedValue: new Animated.Value(height),
  //   });
  // }

  //////////////////////////////////////////////////////////////////////////

  rendermessage = ({item, index}) => {
    let send_time = new Date(item.allmessage_time);
    let send_time_hour = send_time.getHours();
    let send_time_minute = send_time.getMinutes(); //+9
    let message_time = '';

    if (send_time_hour == 12) {
      if (send_time_minute < 10) {
        message_time =
          '?????? ' +
          JSON.stringify(send_time_hour) +
          ':0' +
          JSON.stringify(send_time_minute);
      } else if (send_time_minute > 10) {
        message_time =
          '?????? ' +
          JSON.stringify(send_time_hour) +
          ':' +
          JSON.stringify(send_time_minute);
      }
    } else if (send_time_hour < 12) {
      if (send_time_minute < 10) {
        message_time =
          '?????? ' +
          JSON.stringify(send_time_hour) +
          ':0' +
          JSON.stringify(send_time_minute);
      } else if (send_time_minute > 10) {
        message_time =
          '?????? ' +
          JSON.stringify(send_time_hour) +
          ':' +
          JSON.stringify(send_time_minute);
      }
    } else if (send_time_hour > 12) {
      if (send_time_minute < 10) {
        message_time =
          '?????? ' +
          JSON.stringify(send_time_hour - 12) +
          ':0' +
          JSON.stringify(send_time_minute);
      } else if (send_time_minute > 10) {
        message_time =
          '?????? ' +
          JSON.stringify(send_time_hour - 12) +
          ':' +
          JSON.stringify(send_time_minute);
      }
    }

    if (item.user_nickname === this.state.user_nickname) {
      return (
        <Main_Mymessage
          user_key={item.user_key}
          message={item.message_body}
          time={message_time}
          animate_boolean={this.state.allchatroom_animate_boolean}
        />
      );
    } else {
      return (
        <Main_Yourmessage
          user_key={item.user_key}
          myuser_key={this.state.user_key}
          bockuser={this.bockuser}
          nickname={item.user_nickname}
          message={item.message_body}
          time={message_time}
        />
      );
    }
  };

  scrolltobottom = () => {
    setTimeout(() => {
      if (this.flatlist_ref !== null && this.flatlist_ref.current !== null) {
        this.flatlist_ref.current.scrollToEnd({animated: false});
      }
    }, 500);
  };

  // _scrollEnd = (e) => {
  //   this.flatlist_ref.current.scrollToEnd({animated: false});
  // }

  // backBtn = (e) => {
  //   e.preventDefault();
  //   this.props.navigation.navigate('Main');
  // };

  render() {
    return (
      <SafeAreaView style={styles.Container_main}>
        <SafeAreaView style={styles.Container_main}>
          <SafeAreaView
            style={{position: 'absolute', height: '100%', width: '100%'}}>
            <Animated.View style={{flex: 1, opacity: this.state.value}}>
              {/* <TouchableOpacity
                style={{position: 'absolute', marginTop: 7, left: '2%'}}
                onPress={this.backBtn}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('./backbutton.png')}
                />
              </TouchableOpacity> */}
              <View
                style={{
                  height: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: 'lightgray',
                }}>
                <Text style={{fontWeight: '800', color: 'black', fontSize: 20}}>
                  ?????? ?????????
                </Text>
              </View>
              <ScrollView
                style={{flex: 1}}
                ref="scrollView"
                onContentSizeChange={(width, height) =>
                  this.refs.scrollView.scrollTo({y: height})
                }>
                <FlatList
                  ref={this.flatlist_ref}
                  data={this.state.messages}
                  renderItem={this.rendermessage}
                  refreshing={this.state.refreshing}
                  onRefresh={this._getdata}
                />
              </ScrollView>
              <View
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: this.state.keyboardH,
                }}>
                <TextInput
                  value={this.state.my_all_message}
                  id="my_all_message"
                  onChangeText={(text) => this.setState({my_all_message: text})}
                  onFocus={this.scrolltobottom}
                  onTouchStart={this.scrolltobottom}
                  editable={
                    this.state.allchatroom_animate_boolean ? true : false
                  }
                  style={styles.text_input}
                />
                <TouchableOpacity
                  style={styles.text_input_image}
                  onPress={this.sendmessage}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./send6.png')}
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
                    color: '#eb6c63',
                    fontFamily: 'Jalnan',
                    marginBottom: 15,
                  }}>
                  ?????? ??????
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontSize: 18, color: '#eb6c63', fontWeight: 'bold'}}>
                  ???????????? ???????????? ????????? ??? ??????
                </Text>
                <Text
                  style={{fontSize: 18, color: '#eb6c63', fontWeight: 'bold'}}>
                  ????????? ??????
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
                  backgroundColor: '#eb6c63',
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
                  ?????? ?????? ????????????
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
    height: 30,
    width: '75%',
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#dcdcdc82',
    borderRadius: 24,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  text_input_image: {
    display: 'flex',
    marginTop: 5,
    marginLeft: 20,
  },
});
