import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import RNPickerSelect from 'react-native-picker-select';

const Height = Dimensions.get('window').height;

const func = require('../../server/api');

export default class Set_privacy extends Component {
 constructor(props) {
    super(props);
    this.state = {
      id: '',
      passwd: '',
      nickname: '',
      key: '',
      deptno: '',
      stdno: '',
      studno: '',
      major: '',
      email: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const UserInfo = JSON.parse(result);
      // console.log('닉네임 : ' + UserInfo.user_nickname);
      this.setState({
        key: UserInfo.user_key,
        id: UserInfo.user_id,
        nickname: UserInfo.user_nickname,
        deptno: UserInfo.user_deptno,
        stdno: UserInfo.user_stdno,
        email: UserInfo.user_email,
      });
      const post = {
        key: UserInfo.user_key,
      };
      fetch(func.api(3001, 'call'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            id: json.user_id,
            nickname: json.user_nickname,
            sex: json.user_sex,
            deptno: json.user_deptno,
            stdno: json.user_stdno,
          });
        });
    });
  }
  
  render() {
    return (
      <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor:'white'}}>
        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{height: Height, width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{height: '3%'}}></View>
              <View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10%'}}>
                <Text style={{fontSize: 20, color: '#f05052'}}>와글와글</Text>
                <Text style={{fontSize: 30, color: '#f05052'}}>회원정보 수정</Text>
              </View>
              
              <View style={{display: 'flex', flexDirection: 'row', width: '90%'}}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{fontSize: 25, color: '#f05052'}}>{this.state.nickname}</Text>
                  <Text style={{fontSize: 25}}> 님</Text>
                </View>
              </View>
              <View style={{display: 'flex', width: '90%', marginBottom: '10%'}}>
                <Text style={{fontSize: 15}}>{this.state.email}</Text>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', width: '90%', height: 30, justifyContent: 'space-between',
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: '10%'}}>
                <Text style={{fontSize: 15, color: '#f05052'}}>닉네임</Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{display: 'flex', color: 'black', fontSize: 15}}>
                    {this.state.nickname}
                  </Text>
                  <TouchableOpacity
                    onPress={this.nickname_check_change}>
                    <Image
                      style={{width: 20, height: 20, marginLeft: 10}}
                      source={require('./cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', width: '90%', height: 30, justifyContent: 'space-between',
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: '10%'}}>
                <Text style={{fontSize: 15, color: '#f05052'}}>아이디</Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{display: 'flex', color: 'black', fontSize: 15}}>
                    {this.state.nickname}
                  </Text>
                  <TouchableOpacity
                    onPress={this.nickname_check_change}>
                    <Image
                      style={{width: 20, height: 20, marginLeft: 10}}
                      source={require('./cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', width: '90%', height: 30, justifyContent: 'space-between',
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: '10%'}}>
                <Text style={{fontSize: 15, color: '#f05052'}}>비밀번호</Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{display: 'flex', color: 'black', fontSize: 15}}>
                    {this.state.nickname}
                  </Text>
                  <TouchableOpacity
                    onPress={this.nickname_check_change}>
                    <Image
                      style={{width: 20, height: 20, marginLeft: 10}}
                      source={require('./cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', width: '90%', height: 30, justifyContent: 'space-between',
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: '10%'}}>
                <Text style={{fontSize: 15, color: '#f05052'}}>학과</Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{display: 'flex', color: 'black', fontSize: 15}}>
                    {this.state.nickname}
                  </Text>
                  <TouchableOpacity
                    onPress={this.nickname_check_change}>
                    <Image
                      style={{width: 20, height: 20, marginLeft: 10}}
                      source={require('./cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{display: 'flex', flexDirection: 'row', width: '90%', height: 30, justifyContent: 'space-between',
                            borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: '10%'}}>
                <Text style={{fontSize: 15, color: '#f05052'}}>학번</Text>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Text style={{display: 'flex', color: 'black', fontSize: 15}}>
                    {this.state.nickname}
                  </Text>
                  <TouchableOpacity
                    onPress={this.nickname_check_change}>
                    <Image
                      style={{width: 20, height: 20, marginLeft: 10}}
                      source={require('./cancel.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <TouchableOpacity style={{width: '100%', marginTop: 25, color: 'white', 
                fontFamily: 'Jalnan', paddingTop: 10, 
                paddingBottom: 10, fontSize: 20, backgroundColor: '#f05052'}}
                  onPress={() => {this.props.navigation.navigate('Main');}}>
                  <Text style={{color: 'white', fontFamily: 'Jalnan', fontSize: 20, textAlign: 'center'}}>
                    확인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
});
