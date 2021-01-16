import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
  Platform,
  Dimensions,
  Keyboard,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import RadioButtonRN from 'radio-buttons-react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const func = require('../../server/api');

class Set_exit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      reason: '',
    };
  }
  exit_app = () => {
    console.log('hi');
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
            this.props.navigation.navigate('Login');
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
              display: 'flex',
              // flex: 0.2,
              backgroundColor: 'white',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 21, color: '#eb6c63', marginTop: 10}}>
              와글 와글
            </Text>
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
        <View style={{display: 'flex', flex: 0.5}}>
          <View
            style={{
              display: 'flex',
              flex: 0.15,
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
            onPress={this.exit_app}>
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
