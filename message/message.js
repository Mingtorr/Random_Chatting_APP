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
  AppState
} from 'react-native';
import {withNavigation} from 'react-navigation';
import io from 'socket.io-client';
import Mymessage from './mymessage';
import Yourmessage from './yourmessage';
import Firstmessage from './firstmessage';
const func = require('../server/api');
const timefunc = require('./timefunction');

import AsyncStorage from '@react-native-community/async-storage';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 15 : 15;
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
    };
  }
  _handleAppStateChange = (nextAppState) => {
    if ( this.state.appState.match(/inactive|background/) && nextAppState === 'active' ) {
      console.log('App has come to the foreground!');
    } else {
      console.log('App has gone to the background!');
      // start your background task here
    }
    this.setState({appState: nextAppState});
  };
  componentWillUnmount() {
    const roomid = this.props.route.params.roomid;
    socket.emit('roomleave', roomid);
  }
  componentDidMount() {
    this.scrolltobottom();
    AppState.addEventListener('change', this._handleAppStateChange);
    AsyncStorage.getItem('login_user_info', (err, result) => {
      this.setState({
        userkey: JSON.parse(result).user_key,
        myname: JSON.parse(result).user_nickname,
        myshownickname: this.props.route.params.myshownickname,
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
    socket.on('socketid', (data) => {
      //my socketid
      this.setState({
        mysocket: data,
      });
    });
    socket.on('roomsockets', (data) => {
      //change roomsockets
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
    if (this.state.text.trim() === '') {
      this.setState({
        text: '',
      });
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
        tousertoken:this.props.route.params.tousertoken
      };
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
    console.log('asd');
    fetch(func.api(3005, 'showmessageadd'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
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
          /*
      if(this.state.arr.length >20){
        this.setState({
          start:this.state.arr.length-20
        },this.scrolltobottom())
      }else{
        this.setState({
          start:0
        },this.scrolltobottom())
      }*/
        });
        this.setState({
          change: this.state.change + 1,
        });
      });
    /*
  console.log(this.state.start);
  if(this.state.start<19){
    this.setState({
      refresh:true,
      start:0
    },()=>{
      this.setState({
        refresh:false
      })
    })
  }else{
    this.setState({
      refresh:true,
      start:this.state.start-20,
    },()=>{
   
      this.scrolltomessage();
      this.setState({
        refresh:false
      })
    })
  }
  */
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
      roomid :this.props.route.params.roomid,
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
                  style={{width: 20, height: 20}}
                  source={require('./back.png')}
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
                <Text
                  style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                  알수없음
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
                  style={{width: 40, height: 40}}
                  source={require('./megaphone.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{display: 'flex', flex: 0.93, backgroundColor: 'white'}}>
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
              flex: 0.06,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
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
              style={{display: 'flex',width: 35, height: 35, marginTop: 10, marginLeft: 20}}
              onPress={this.sendmessage}>
              <Image
                style={{width: 35, height: 35}}
                source={require('./send.png')}
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
