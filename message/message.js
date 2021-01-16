/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Header} from 'react-navigation-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  AppState,
  Alert
} from 'react-native';
import {withNavigation} from 'react-navigation';
import io from 'socket.io-client';
import Mymessage from './mymessage';
import Yourmessage from './yourmessage';
import Firstmessage from './firstmessage';
const func = require('../server/api');
const timefunc = require('./timefunction');

import AsyncStorage from '@react-native-community/async-storage';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 15 : 30;
const socket = io(func.api(3005, ''));

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      userkey: '',
      myname: '',
      touserkey: this.props.route.params.touser,
      mysocket: '',
      roomsockets: [],
      name2: '',
      pass: '',
      start: 0,
      page: 1,
      refresh: false,
      lastownername: false,
      arr: [],
      arrendkey: '',
      text: '',
      id: 'aaa',
      mynickname: '',
      toshownickname: this.props.route.params.toshownickname,
      resultshownickname: 0,
      change: 1,
      appState: AppState.currentState,
      reception: this.props.route.params.reception,
      exit: 0,
    };
  }
  _handleAppStateChange = (nextAppState) => {
    const roomid = this.props.route.params.roomid;
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('App has come to the foreground!');
    } else {
      // console.log('App has gone to the background!');
      socket.emit('roomleave', roomid);
      // start your background task here
    }
    this.setState({appState: nextAppState});
  };
  componentWillUnmount() {
    // console.log('asdasd');
    const roomid = this.props.route.params.roomid;
    socket.emit('roomleave', roomid);
  }
  componentDidMount() {
    // console.log(this.props.route.params);
    this.scrolltobottom();
    AppState.addEventListener('change', this._handleAppStateChange);
    AsyncStorage.getItem('login_user_info', (err, result) => {
      this.setState({
        userkey: JSON.parse(result).user_key,
        myname: JSON.parse(result).user_nickname,
        myshownickname: this.props.route.params.myshownickname,
        recpetion: this.props.route.params.recpetion,
      });
    });
    
    const data = {
      roomid: this.props.route.params.roomid, //roomid
      userkey: this.state.userkey,
    };
    const data2 = {
      touser: this.state.touserkey,
    };
    socket.emit('roomjoin', data); //방참가
    socket.on('receptionrecieve', (data) => {
      // console.log(JSON.stringify(data) + '미낭ㅁ나ㅣㅓㅇ마ㅣ너아ㅣㅁ넝');
      this.setState({
        reception: data.reception,
      });
    });
    socket.on('socketid', (data) => {
      //my socketid
      this.setState({
        mysocket: data,
      });
    });
    socket.on('roomsockets', (data) => {
      //change roomsockets
      // console.log(data + '실험');
      this.setState({
        roomsockets: data,
      });
    });
    socket.on('shownickname', (data) => {
      //change roomsockets
      this.setState({
        resultshownickname: 1,
      });
    });
    fetch(func.api(3005, 'mynickname'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data2),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          mynickname: json.user_nickname,
        });
      });
    fetch(func.api(3005, 'showmessage'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json !== undefined) {
          json.map((value, index) => {
            const realtime = timefunc.settime2(value.message_time);
            const row = {
              key: value.message_key,
              name: value.user_nickname,
              message: value.message_body,
              sendid: value.user_key,
              time: realtime,
            };
            this.setState({
              arr: [...this.state.arr, row],
            });
            this.setState({
              arrendkey: this.state.arr[this.state.arr.length - 1].key,
            });
            /*
      if(this.state.arr.length >20){
        this.setState({
          start:this.state.arr.length-20
        },this.scrolltobottom())
      }else{
        this.setState({
          start:0
        },this.scrolltobottom())
      }
      */
          });
        }
      });
    /*
    if(this.state.arr.length>20){
      this.setState({
        start:this.state.arr.length-20
      })
    }
   */
    // console.log(this.state.page);
    socket.on('recieve_message', (data) => {
      this.setState({
        arr: [...this.state.arr, data],
      });
      this.scrolltobottom();
    });
  }

  sendmessage = () => {
    
    // console.log('상대방의 리셉션' + this.state.reception);
    if (this.state.text.trim() === '') {
      this.setState({
        text: '',
      });
    } else if(this.state.arr[this.state.arr.length-1].message === 'delcode5010'){
      this.setState({
        text:''
      })
      // alert("상대방이 나가셔서 메시지를 보낼 수 없습니다.")
      Alert.alert(
        "안내",
        "상대방이 나가서 메시지를 보낼 수 없습니다.",
        [{text: "OK", style: "OK"}],
        { cancelable: false }
      );
    } else {
      const realtime = timefunc.settime();
      const realtime2 = new Date();
      const data = {
        roomid: this.props.route.params.roomid, //룸아이디 입력
        roomsockets: this.state.roomsockets,
        name: this.state.myname,
        userkey: this.state.userkey,
        message: this.state.text,
        touserkey: this.state.touserkey,
        time: realtime,
        time2: realtime2,
        arrendkey: this.state.arrendkey,
        myshownickname: this.state.myshownickname,
        toshownickname: this.state.toshownickname,
        tousertoken: this.props.route.params.tousertoken,
      };
      if (this.state.roomsockets.length !== 2 && this.state.reception === 1) {
        // console.log('상대방에게 푸시알림 전송');
        fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization:
              'key=AAAAf8r9TLk:APA91bGRKvjP5bZaQfb1m0BUK9JGk1RZLvDQF4BJZ6ZJXGAEzR3ZRrf2I3ZqaZlluDOMCLh6QtRW9i54NTeZFeBEAIpW5mJtZ5ZU0RwEs8PFhGi4DvPIZeH3yK5xBktqdCXBolvqiECA',
          },
          body: JSON.stringify({
            to: data.tousertoken,
            content_available: true,
            notification: {
              title: data.name + '님이 메세지를 보냈습니다.',
              body: data.message,
              android_channel_id: '500',
            },
            priority: 'high',
          }),
        });
      }
      fetch(func.api(3005, 'save_message'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then();
      if (this.state.myshownickname === 0) {
        fetch(func.api(3005, 'updateshownickname'), {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then();
      }
      socket.emit('onclick_message', data);
      this.setState({
        text: '',
      });
    }

    //메시지 보냄
  };
  scrolltobottom = () => {
    setTimeout(() => {
      if (this.scrollViewRef !== null && this.scrollViewRef.current !== null) {
        this.scrollViewRef.current.scrollToEnd({animated: false});
      }
    }, 400);
  };
  scrolltomessage = () => {
    /*
  setTimeout(()=>{
    if(this.state.arr.length-this.state.start<20){
    }else{
      this.scrollViewRef.current.scrollToIndex({animated: false,index:19});
    }
  },400)
  */
  };
  func = () => {
    const data = {
      roomid: this.props.route.params.roomid, //roomid
      userkey: this.state.userkey,
      count: this.state.change,
    };
    // console.log('asd');
    fetch(func.api(3005, 'showmessageadd'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json !== undefined) {
          json.map((value, index) => {
            const realtime = timefunc.settime2(value.message_time);
            const row = {
              key: value.message_key,
              name: value.user_nickname,
              message: value.message_body,
              sendid: value.user_key,
              time: realtime,
            };
            this.setState({
              arr: [row, ...this.state.arr],
            });
          });
          this.setState({
            change: this.state.change + 1,
          });
        }
      });
  };
  message_onchange = (e) => {
    this.setState({
      text: e,
    });
  };
  wholastmessage = () => {
    this.setState({
      lastownername: true,
    });
  };
  wholastmessage2 = () => {
    this.setState({
      lastownername: false,
    });
  };
  rendermessage = ({item, index}) => {
    {
      if (index === 0) {
        if (this.state.userkey === item.sendid) {
          return <Mymessage message={item.message} time={item.time} />;
        } else {
          return (
            <Yourmessage
              message={item.message}
              name={item.name}
              pre={false}
              time={item.time}
            />
          );
        }
      } else {
        if (
          this.state.arr[this.state.start + index - 1].sendid === item.sendid
        ) {
          if (this.state.userkey === item.sendid) {
            return <Mymessage message={item.message} time={item.time} />;
          } else {
            return (
              <Yourmessage
                message={item.message}
                name={item.name}
                pre={true}
                time={item.time}
              />
            );
          }
        } else {
          if (this.state.userkey === item.sendid) {
            return <Mymessage message={item.message} time={item.time} />;
          } else {
            return (
              <Yourmessage
                message={item.message}
                name={item.name}
                pre={false}
                time={item.time}
              />
            );
          }
        }
      }
    }
  };
  go = () => {
    this.props.navigation.navigate('singo', {
      roomid: this.props.route.params.roomid,
      userkey: this.state.userkey,
      touserkey: this.state.touserkey,
    });
  };

  back = () => {
    const roomid = this.props.route.params.roomid;
    socket.emit('roomleave', roomid);
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <SafeAreaView style={styles.message_safe}>
        <KeyboardAvoidingView
          style={{
            display: 'flex',
            backgroundColor: 'white',
            flex: 1,
            flexDirection: 'column',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          onAccessibilityAction={this.scrolltobottom}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={styles.message_top}>
            <View
              style={{
                display: 'flex',
                flex: 0.15,
                backgroundColor: 'white',
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity
                style={{display: 'flex', marginLeft: 10}}
                onPress={this.back}>
                <Image
                  style={{width: 15, height: 20}}
                  source={require('./back2.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flex: 0.7,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {this.state.toshownickname === 0 &&
              this.state.resultshownickname === 0 ? (
                <Text style={{color: 'gray', fontSize: 17, fontWeight: 'bold'}}>
                  답장을 기다리고 있습니다.
                </Text>
              ) : (
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
                  {this.state.mynickname} 님
                </Text>
              )}
            </View>
            <View
              style={{
                display: 'flex',
                flex: 0.15,
                backgroundColor: 'white',
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity style={{display: 'flex'}} onPress={this.go}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('./singo.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{display: 'flex', flex: 0.97, backgroundColor: 'white'}}>
            <FlatList
              ref={this.scrollViewRef}
              keyExtractor={(item) => item.key.toString()}
              refreshing={this.state.refresh}
              onRefresh={this.func}
              data={this.state.arr} //여기서
              renderItem={this.rendermessage}
            />
          </View>
          <View
            style={{
              display: 'flex',
              height: 50,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 0,
            }}>
            <TextInput
              value={this.state.text}
              id="text"
              name="text"
              onFocus={this.scrolltobottom}
              onChangeText={this.message_onchange}
              onTouchStart={this.scrolltobottom}
              style={{
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
              }}
            />
            <TouchableOpacity
              style={{
                display: 'flex',
                width: 35,
                height: 35,
                marginTop: 10,
                marginLeft: 20,
              }}
              onPress={this.sendmessage}>
              <Image
                style={{width: 35, height: 35}}
                source={require('./send6.png')}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  message_main: {
    display: 'flex',
    backgroundColor: '#c7d9ff',
    flex: 1,
  },
  message_safe: {
    display: 'flex',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  message_top: {
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
  },
});

export default withNavigation(Message);