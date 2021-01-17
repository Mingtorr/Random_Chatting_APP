import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
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
} from 'react-native';
import {withNavigation} from 'react-navigation';
import io from 'socket.io-client';
import Mymessage from './groupme';
import Yourmessage from './groupother';
const func = require('../server/api');

import AsyncStorage from '@react-native-community/async-storage';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 15 : 0;
const socket = io(func.api(3005, ''));

class Groupmessage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      userkey: '',
      myname: '',
      touserkey: '',
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
      roomsize: 0,
      appState: AppState.currentState,
    };
  }
  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('App has come to the foreground!');
      socket.emit('groupjoin', {groupkey: '1'});
    } else {
      // console.log('App has gone to the background!');
      socket.emit('groupleave', {roomkey: '1'});
      // start your background task here
    }
    this.setState({appState: nextAppState});
  };
  componentWillUnmount() {
    socket.emit('groupleave', {roomkey: '1'});
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    AsyncStorage.getItem('login_user_info', (err, result) => {
      this.setState({
        userkey: JSON.parse(result).user_key,
        myname: JSON.parse(result).user_nickname,
      });
    });
    socket.emit('groupjoin', {groupkey: '1'});
    socket.on('recieve_groupmessage', (data) => {
      this.setState({
        arr: [...this.state.arr, data],
      });
      this.scrolltobottom();
    });
    socket.on('groupsize', (arr) => {
      this.setState({
        roomsize: arr.length,
      });
    });
  }

  sendmessage = () => {
    const data = {
      key: 1,
      message: this.state.text,
      userkey: this.state.userkey,
      name: this.state.myname,
    };
    socket.emit('group_sendmessage', data);
    this.scrolltobottom();
  };
  scrolltobottom = () => {
    setTimeout(() => {
      if (this.scrollViewRef !== null && this.scrollViewRef.current !== null) {
        this.scrollViewRef.current.scrollToEnd({animated: false});
      }
    }, 500);
  };
  scrolltomessage = () => {
    setTimeout(() => {
      if (this.state.arr.length - this.state.start < 20) {
      } else {
        this.scrollViewRef.current.scrollToIndex({animated: false, index: 19});
      }
    }, 500);
  };
  func = () => {
    if (this.state.start < 19) {
      this.setState(
        {
          refresh: true,
          start: 0,
        },
        () => {
          this.setState({
            refresh: false,
          });
        },
      );
    } else {
      this.setState(
        {
          refresh: true,
          start: this.state.start - 20,
        },
        () => {
          this.scrolltomessage();
          this.setState({
            refresh: false,
          });
        },
      );
    }
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
        if (this.state.userkey === item.userkey) {
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
          this.state.arr[this.state.start + index - 1].userkey === item.userkey
        ) {
          if (this.state.userkey === item.userkey) {
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
          if (this.state.userkey === item.userkey) {
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
    // console.log('신고하기');
  };
  render() {
    return (
      <SafeAreaView style={styles.message_safe}>
        <Button title="신고하기" onPress={this.go} />
        <KeyboardAvoidingView
          style={styles.message_safe}
          behavior="padding"
          onAccessibilityAction={this.scrolltobottom}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={styles.message_top}>
            <View
              style={{
                display: 'flex',
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{fontFamily: 'Jalnan', color: 'white', fontSize: 20}}>
                심심한사람 다모여라
              </Text>
              <Text
                style={{
                  fontFamily: 'Jalnan',
                  color: 'white',
                  fontSize: 20,
                }}></Text>
            </View>
          </View>
          <View style={styles.message_top2}>
            <View
              style={{
                display: 'flex',
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontFamily: 'Jalnan',
                  color: 'black',
                  fontSize: 15,
                  marginRight: 20,
                }}>
                접속 : {this.state.roomsize}명
              </Text>
              <Text
                style={{
                  fontFamily: 'Jalnan',
                  color: 'black',
                  fontSize: 15,
                  marginRight: 20,
                }}>
                참여 : 4명
              </Text>
            </View>
          </View>
          <View style={{display: 'flex', flex: 0.93, backgroundColor: 'white'}}>
            <FlatList
              ref={this.scrollViewRef}
              keyExtractor={(item) => item.key.toString()}
              refreshing={this.state.refresh}
              onRefresh={this.func}
              data={this.state.arr.slice(
                this.state.start,
                this.state.arr.length,
              )} //여기서
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
              marginBottom: 10,
            }}>
            <TextInput
              value={this.state.text}
              id="text"
              name="text"
              onChangeText={this.message_onchange}
              onTouchStart={this.scrolltobottom}
              style={{
                display: 'flex',
                height: 30,
                width: 300,
                marginTop: 5,
                marginBottom: 5,
                backgroundColor: '#dcdcdc82',
                borderRadius: 24,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              on
            />
            <TouchableOpacity
              style={{display: 'flex', marginTop: 5, marginLeft: 20}}
              onPress={this.sendmessage}>
              <Image
                style={{width: 35, height: 35}}
                source={require('./sendmessage.png')}
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
    backgroundColor: '#a1bdff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message_top2: {
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default withNavigation(Groupmessage);
