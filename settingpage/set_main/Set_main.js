import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';

const func = require('../../server/api');

class Set_main extends Component {
  state = {
    modalVisible: false,
    key: '',
  };
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  logout = async () => {
    // console.log(AsyncStorage.getItem('login_onoff'));
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    AsyncStorage.removeItem('login_onoff_set', () => {
      console.log('로그아웃'); // User1 출력
      // console.log(AsyncStorage.getItem('login_onoff'));
      this.props.navigation.navigate('Login');
    });
  };
  withdrawal = () => {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const UserInfo = JSON.parse(result);
      this.setState({
        key: UserInfo.user_key,
      });
      const post = {
        key: UserInfo.user_key,
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
  go_Privacy = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Set_privacy');
  };
  go_Alarm = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Set_alarm');
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <SafeAreaView style={styles.Container_set_main}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView_set_main}>
            <View style={styles.modalView_set_main}>
              <Text style={styles.modalText_set_main}>
                정말 떠나실 건가요 😂...?
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '60%',
                }}>
                <TouchableHighlight
                  style={{
                    ...styles.openButton_set_main,
                    backgroundColor: '#2196F3',
                  }}
                  onPress={this.withdrawal}>
                  <Text style={styles.textStyle_set_main}>네</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...styles.openButton_set_main,
                    backgroundColor: '#2196F3',
                  }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle_set_main}>아니오</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.Head_set_main}>
          <Text style={{fontFamily: 'Jalnan'}}>Setting</Text>
        </View>
        <TouchableOpacity style={styles.Box_set_main} onPress={this.go_Privacy}>
          <Text style={{fontFamily: 'Jalnan', marginLeft: 30}}>
            개인정보 변경
          </Text>
          <Text style={{fontFamily: 'Jalnan', marginRight: 30, fontSize: 20}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box_set_main} onPress={this.go_Alarm}>
          <Text style={{fontFamily: 'Jalnan', marginLeft: 30}}>알람 설정</Text>
          <Text style={{fontFamily: 'Jalnan', marginRight: 30, fontSize: 20}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box_set_main}>
          <Text style={{fontFamily: 'Jalnan', marginLeft: 30}}>
            건의 사항/도움말
          </Text>
          <Text style={{fontFamily: 'Jalnan', marginRight: 30, fontSize: 20}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box_set_main}>
          <Text style={{fontFamily: 'Jalnan', marginLeft: 30}}>공지사항</Text>
          <Text style={{fontFamily: 'Jalnan', marginRight: 30, fontSize: 20}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Box_set_main} onPress={this.logout}>
          <Text style={{fontFamily: 'Jalnan', marginLeft: 30}}>로그아웃</Text>
          <Text style={{fontFamily: 'Jalnan', marginRight: 30, fontSize: 20}}>
            {'>'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Box_set_main}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{fontFamily: 'Jalnan', marginLeft: 30}}>회원탈퇴</Text>
          <Text style={{fontFamily: 'Jalnan', marginRight: 30, fontSize: 20}}>
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
    // backgroundColor : 'lightblue',
    borderBottomWidth: 1,
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
