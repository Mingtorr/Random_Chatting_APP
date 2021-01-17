import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {CommonActions} from '@react-navigation/native';

const func = require('../../server/api');

class Set_main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      id: '',
      nickname: '',
      deptno: '',
      stdno: '',
      email: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const user_info = JSON.parse(result);
      console.log(user_info);
      this.setState({
        id: user_info.user_id,
        nickname: user_info.user_nickname,
        deptno: user_info.user_deptno,
        stdno: user_info.user_stdno,
        email: user_info.user_email,
      });
    });
  }

  logout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '아니요',
          style: 'cancel',
        },
        {text: '네', onPress: () => this.logout2()}, // 화살표 함수로 바인딩 대체
      ],
      {cancelable: false},
    );
  };

  logout2 = async () => {
    let userkey;
    await AsyncStorage.getItem('login_user_info', (err, result) => {
      userkey = JSON.parse(result).user_key;
      const box = {userkey: userkey};
      fetch(func.api(3001, 'reset_token'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(box),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        });
    });

    AsyncStorage.removeItem('login_onoff_set', () => {
      AsyncStorage.removeItem('login_user_info', () => {
        console.log('로그아웃'); // User1 출력
        // console.log(AsyncStorage.getItem('login_onoff'));
        // this.props.navigation.navigate('Login');
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      });
    });
  };

  withdrawal = () => {};
  go_Privacy = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Set_privacy', {
      id: this.state.id,
      nickname: this.state.nickname,
      deptno: this.state.deptno,
      stdno: this.state.stdno,
      email: this.state.email,
    });
  };
  go_Alarm = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Set_alarm');
  };
  go_Notice = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Set_notice');
  };
  go_exit = (e) => {
    this.props.navigation.navigate('exit');
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <SafeAreaView style={{display: 'flex', backgroundColor: 'white'}}>
        <View style={styles.Head_set_main}>
          <Text style={{fontSize: 20, color: 'black'}}>Setting</Text>
        </View>
        <TouchableOpacity style={styles.Box_set_main} onPress={this.go_Privacy}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <Text style={{marginLeft: 15, fontSize: 16, color: '#000000'}}>
              개인정보 변경
            </Text>
          </View>
          <Text style={{marginRight: 30, fontSize: 20, color: '#eb6c63'}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box_set_main} onPress={this.go_Alarm}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <Text style={{marginLeft: 15, fontSize: 16, color: '#000000'}}>
              알림 설정
            </Text>
          </View>
          <Text style={{marginRight: 30, fontSize: 20, color: '#eb6c63'}}>
            {'>'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Box_set_main} onPress={this.go_Notice}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <Text style={{marginLeft: 15, fontSize: 16, color: '#000000'}}>
              공지 사항
            </Text>
          </View>
          <Text style={{marginRight: 30, fontSize: 20, color: '#eb6c63'}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box_set_main} onPress={this.logout}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <Text style={{marginLeft: 15, fontSize: 16, color: '#000000'}}>
              로그아웃
            </Text>
          </View>
          <Text style={{marginRight: 30, fontSize: 20, color: '#eb6c63'}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box_set_main} onPress={this.go_exit}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: '5%'}}>
            <Text style={{marginLeft: 15, fontSize: 16, color: '#000000'}}>
              회원 탈퇴
            </Text>
          </View>
          <Text style={{marginRight: 30, fontSize: 20, color: '#eb6c63'}}>
            {'>'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container_set_main: {
    display: 'flex',
  },
  Head_set_main: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  Box_set_main: {
    height: 65,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  centeredView_set_main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView_set_main: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText_set_main: {
    marginBottom: 15,
    textAlign: 'center',
  },
  openButton_set_main: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle_set_main: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default withNavigation(Set_main);
