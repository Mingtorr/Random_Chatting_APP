import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Dimensions,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const Height = Dimensions.get('window').height;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0;

import AsyncStorage from '@react-native-community/async-storage';
const func = require('../server/api');

export default class Solo_match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      major: '',
      isEnabled: false,
      isDepton: false,
      message: '',
      sex: '이성',
    };
  }

  submit = () => {
    var to_sex = 0;
    let deptno = '';
    let userkey = '';
    let nickname;
    if (this.state.message === '') {
      alert('전송할 메시지를 입력하세요');
      return;
    }
    AsyncStorage.getItem('login_user_info', (err, result) => {
      userkey = JSON.parse(result).user_key;
      nickname = JSON.parse(result).user_nickname;
      if (
        (JSON.parse(result).user_sex == 0 && this.state.isEnabled === false) ||
        (JSON.parse(result).user_sex == 1 && this.state.isEnabled)
      ) {
        to_sex = 1;
      }
      if (this.state.isDepton) {
        console.log(JSON.parse(result).user_deptno);
        if (JSON.parse(result).user_deptno === '') {
          alert('자신의 학과를 먼저 선택해주세요');
          return;
        }
        deptno = JSON.parse(result).user_deptno;
      }
      if (this.state.major !== '' && JSON.parse(result).user_deptno === '') {
        alert('자신의 학번를 먼저 선택해주세요');
        return;
      }
    }).then(() => {
      const box2 = {
        user_key: userkey,
      };
      fetch(func.api(3003, 'minus_heart'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(box2),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json === false) {
            alert('채팅권 갯수가 부족합니다. 충전해주세요');
            console.log(json);
          } else {
            this.props.resetHeart(json.heart);
            const box = {
              major: this.state.major,
              sex: to_sex,
              deptno: deptno,
              message: this.state.message,
              user_key: userkey,
            };

            fetch(func.api(3003, 'sendMessage'), {
              method: 'post',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(box),
            })
              .then((res) => res.json())
              .then((json) => {
                console.log(json.user_token);
                if (json === false) alert('조건에 맞는 사용자가 없습니다.');
                else if (json === true || json === undefined || json === 0)
                  alert('메시지를 전송했습니다.');
                else {
                  alert('메시지를 전송했습니다.');
                  fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                      Authorization:
                        'key=AAAAf8r9TLk:APA91bGRKvjP5bZaQfb1m0BUK9JGk1RZLvDQF4BJZ6ZJXGAEzR3ZRrf2I3ZqaZlluDOMCLh6QtRW9i54NTeZFeBEAIpW5mJtZ5ZU0RwEs8PFhGi4DvPIZeH3yK5xBktqdCXBolvqiECA',
                    },
                    body: JSON.stringify({
                      to: json.user_token,
                      notification: {
                        title: nickname+"님이 메세지를 보냈습니다.",
                        body: this.state.message,
                        android_channel_id: 'test - channel',
                        sound: 'default',
                        android_channel_id: '500',
                      },
                      priority: 'high',
                    }),
                  });
                }
              });
          }
        });
    });
  };

  _scrollToInput = (reactNode) => {
    this.scroll.props.scrollToFocusedInput(reactNode);
  };
  toggleSwitch1 = () => {
    if (this.state.sex == '이성') {
      this.setState({
        isEnabled: !this.state.isEnabled,
        sex: '동성',
      });
    } else {
      this.setState({
        isEnabled: !this.state.isEnabled,
        sex: '이성',
      });
    }
  };
  toggleSwitch2 = () => {
    this.setState({
      isDepton: !this.state.isDepton,
    });
  };
  handletxt = (e) => {
    this.setState({
      message: e,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.matching_tab_bg}>
        <KeyboardAwareScrollView
          style={styles.matching_tab_bg}
          behavior="padding"
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View
            style={{display: 'flex', flex: 0.2, height: Height * 0.1}}></View>
          <View style={{display: 'flex', flex: 0.7}}>
            <View
              style={{
                display: 'flex',
                flex: 0.25,
                flexDirection: 'row',
                height: Height * 0.1,
                paddingTop: Height * 0.03,
              }}>
              <View
                style={{
                  display: 'flex',
                  flex: 0.7,
                  justifyContent: 'center',
                  marginLeft: 40,
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.3),
                    fontWeight: 'bold',
                  }}>
                  {this.state.sex}에게만
                </Text>
              </View>
              <View
                style={{display: 'flex', flex: 0.3, justifyContent: 'center'}}>
                <Switch
                  trackColor={{false: 'white', true: '#eb6c63'}}
                  thumbColor={this.state.isEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#white"
                  onValueChange={this.toggleSwitch1}
                  value={this.state.isEnabled}
                  style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
                />
              </View>
            </View>

            <View style={{display: 'flex', flex: 0.25, flexDirection: 'row'}}>
              <View
                style={{
                  display: 'flex',
                  flex: 0.7,
                  justifyContent: 'center',
                  marginLeft: 40,
                  height: Height * 0.08,
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.3),
                    fontWeight: 'bold',
                  }}>
                  같은 학과만
                </Text>
              </View>
              <View
                style={{display: 'flex', flex: 0.3, justifyContent: 'center'}}>
                <Switch
                  trackColor={{false: 'white', true: '#eb6c63'}}
                  thumbColor={this.state.isEnabled ? 'white' : 'white'}
                  ios_backgroundColor="#white"
                  onValueChange={this.toggleSwitch2}
                  value={this.state.isDepton}
                  style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
                />
              </View>
            </View>
            <View style={{display: 'flex', flex: 0.25}}>
              <View
                style={{
                  display: 'flex',
                  flex: 0.4,
                  marginLeft: 40,
                  height: Height * 0.04,
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.3),
                    fontWeight: 'bold',
                  }}>
                  학번
                </Text>
              </View>
              <View style={{display: 'flex', flex: 0.6, zIndex: 999}}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '10%',
                    marginRight: '10%',
                  }}>
                  <RNPickerSelect
                    style={{
                      inputAndroid: {
                        justifyContent: 'center',
                        textAlign: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        placeholderColor: '#ababa',
                        borderRadius: 10,
                        fontSize: 17,
                        // borderWidth: 0.5,
                        fontWeight: 'bold',
                        // backgroundColor: '#e9ecef',
                        height: 40,
                        color: 'gray',
                      },
                      inputIOS: {
                        justifyContent: 'center',
                        fontSize: 17,
                        textAlign: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        placeholderColor: '#ababa',
                        // borderWidth: 0.5,
                        borderRadius: 10,
                        fontWeight: 'bold',
                        color: 'gray',
                        height: 40,
                        backgroundColor: '#e9ecef',
                      },
                    }}
                    placeholder={
                      {
                        // label: '학과선택',
                        // value: null,
                      }
                    }
                    onValueChange={(value) => this.setState({major: value})}
                    items={[
                      {label: '모든 학번', value: ''},
                      {label: '20학번', value: '20'},
                      {label: '19학번', value: '19'},
                      {label: '18학번', value: '18'},
                      {label: '17학번', value: '17'},
                      {label: '16학번', value: '16'},
                      {label: '15학번', value: '15'},
                      {label: '14학번', value: '14'},
                      {label: '13학번', value: '13'},
                      {label: '12학번', value: '12'},
                      {label: '11학번', value: '11'},
                      {label: '10학번', value: '10'},
                      {label: '09학번', value: '09'},
                      {label: '08학번', value: '08'},
                      {label: '07학번', value: '07'},
                      {label: '06학번', value: '06'},
                      {label: '05학번', value: '05'},
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={{display: 'flex', flex: 0.5}}>
              <View
                style={{
                  display: 'flex',
                  flex: 0.3,
                  justifyContent: 'center',
                  marginLeft: 40,
                  height: Height * 0.05,
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.3),
                    fontWeight: 'bold',
                  }}>
                  메세지
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flex: 0.6,
                  width: '80%',
                  marginLeft: '10%',
                }}>
                <TextInput
                  placeholder="보낼 메세지를 입력해주세요"
                  style={{
                    height: '100%',
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 15,
                    padding: 10,
                    height: Height * 0.15,
                  }}
                  value={this.state.message}
                  onChangeText={this.handletxt}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
            </View>
            <View></View>
          </View>
          <View style={{display: 'flex', flex: 0.1}}></View>
        </KeyboardAwareScrollView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#E94e68', '#eb6c63']}
          style={styles.linearGradient}
          style={{
            display: 'flex',
            flex: 0.1,
            backgroundColor: '#E94e68',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={this.submit}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.3),
                fontWeight: 'bold',
                fontFamily: 'Jalnan',
                color: 'white',
              }}>
              메세지 보내기
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  matching_tab_bg: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});
