import React, {PureComponent} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';

const func = require('../../server/api');

class Set_exit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      reason: '',
    };
  }

  exitAlert = () => {
    Alert.alert(
      '회원 탈퇴',
      '정말 떠나실 건가요?',
      [
        {
          text: '아니요',
          style: 'cancel',
        },
        {text: '네', onPress: () => this.exit_app()}, // 화살표 함수로 바인딩 대체
      ],
      {cancelable: false},
    );
  };

  exit_app = () => {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const UserInfo = JSON.parse(result);
      const post = {
        key: UserInfo.user_key,
        reason: this.state.reason,
      };
      fetch(func.api(3001, 'withdrawal'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            AsyncStorage.removeItem('login_onoff_set', () => {
              AsyncStorage.removeItem('login_user_info', () => {
                // console.log(AsyncStorage.getItem('login_onoff'));
                this.props.navigation.navigate('Login');
                // this.props.navigation.dispatch(
                //   CommonActions.reset({
                //     index: 0,
                //     routes: [{name: 'Login'}],
                //   }),
                // );
              });
            });
            // this.props.navigation.navigate('Login');
          } else {
            alert('삭제 실패');
          }
        });
    });
  };

  backBtn = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    const data = [
      {
        label: '재미가 없어서',
      },
      {
        label: '기능이 별로 없어서',
      },
      {
        label: '앱을 잘 사용하지 않아서',
      },
      {
        label: '악성 유저가 많아서',
      },
      {
        label: '기타',
      },
    ];
    return (
      <SafeAreaView
        style={{display: 'flex', backgroundColor: 'white', flex: 1}}>
        <View style={{display: 'flex', flex: 0.25, backgroundColor: 'white'}}>
          <View
            style={{
              display: 'flex',
              // flex: 0.2,
              backgroundColor: 'white',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
            }}>
            <TouchableOpacity onPress={this.backBtn}>
              <Image
                style={{width: 20, height: 25, marginTop: 10}}
                source={require('../../message/back2.png')}
              />
            </TouchableOpacity>

            <View
              style={{
                display: 'flex',
                // flex: 0.2,
                backgroundColor: 'white',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginLeft: '-5%',
              }}>
              <Text style={{fontSize: 21, color: '#eb6c63', marginTop: 10}}>
                와글 와글
              </Text>
            </View>
            <View />
          </View>

          <View
            style={{
              display: 'flex',
              // flex: 0.23,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 33, color: '#eb6c63', fontWeight: '600'}}>
              회원 탈퇴
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              // flex: 0.1,
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontWeight: '500',
                marginTop: 20,
              }}>
              정말 떠나실 건가요?
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              // flex: 0.15,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 3,
            }}>
            <Text style={{fontSize: 15, color: 'black', fontWeight: '500'}}>
              회원 탈퇴시 모든 기록이 삭제됩니다.
            </Text>
          </View>
        </View>
        <View style={{display: 'flex', flex: 0.5, marginTop: '7%'}}>
          <View
            style={{
              display: 'flex',
              // flex: 0.15,
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#eb6c63',
                fontWeight: '900',
                marginLeft: 40,
              }}>
              탈퇴 이유가 무엇인가요?
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              // flex: 0.8,
              backgroundColor: 'white',
              marginTop: 3,
            }}>
            <RadioButtonRN
              data={data}
              selectedBtn={(e) => {
                this.setState({reason: e.label});
              }}
              activeColor="#eb6c63"
              boxStyle={{borderColor: 'white', height: '15%'}}
              style={{height: '100%'}}
            />
          </View>
        </View>
        <View
          style={{display: 'flex', flex: 0.2, backgroundColor: 'white'}}></View>

        <View style={{display: 'flex', flex: 0.07, backgroundColor: 'green'}}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flex: 1,
              backgroundColor: '#f05052',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this.exitAlert}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: '900'}}>
              확 인
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(Set_exit);
