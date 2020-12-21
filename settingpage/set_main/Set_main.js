import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class Set_main extends Component {
  
  logout = async ()=>{
    // console.log(AsyncStorage.getItem('login_onoff'));
    const keys = await AsyncStorage.getAllKeys();
    console.log(keys);
    AsyncStorage.removeItem('login_onoff_set', () => {
      console.log('로그아웃'); // User1 출력
      // console.log(AsyncStorage.getItem('login_onoff'));
    this.props.navigation.navigate('Login')
    });
  }

  go_Privacy =(e)=>{
    e.preventDefault();
    this.props.navigation.navigate('Set_privacy')
  }
  go_Alarm = (e)=>{
    e.preventDefault();
    this.props.navigation.navigate('Set_alarm')
  }
  render() {
    return (
      <SafeAreaView style = {styles.Container_set_main}>
        <View style = {styles.Head_set_main}>
          <Text style ={{fontFamily : 'Jalnan'}}>Setting</Text>
        </View>
        <TouchableOpacity style = {styles.Box_set_main} onPress ={this.go_Privacy}>
          <Text style = {{fontFamily : 'Jalnan', marginLeft : 30}}>개인정보 변경</Text>
          <Text style = {{fontFamily : 'Jalnan', marginRight : 30, fontSize : 20}}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.Box_set_main} onPress = {this.go_Alarm}>
          <Text style = {{fontFamily : 'Jalnan', marginLeft : 30}}>알람 설정</Text>
          <Text style = {{fontFamily : 'Jalnan', marginRight : 30, fontSize : 20}}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.Box_set_main}>
          <Text style = {{fontFamily : 'Jalnan', marginLeft : 30}}>건의 사항/도움말</Text>
          <Text style = {{fontFamily : 'Jalnan', marginRight : 30, fontSize : 20}}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.Box_set_main}>
          <Text style = {{fontFamily : 'Jalnan', marginLeft : 30}}>공지사항</Text>
          <Text style = {{fontFamily : 'Jalnan', marginRight : 30, fontSize : 20}}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.Box_set_main} onPress={this.logout}>
          <Text style = {{fontFamily : 'Jalnan', marginLeft : 30}}>로그아웃</Text>
          <Text style = {{fontFamily : 'Jalnan', marginRight : 30, fontSize : 20}}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.Box_set_main}>
          <Text style = {{fontFamily : 'Jalnan', marginLeft : 30}}>회원탈퇴</Text>
          <Text style = {{fontFamily : 'Jalnan', marginRight : 30, fontSize : 20}}>{'>'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  Container_set_main :{
    display : "flex",
  },
  Head_set_main :{
    height : 50,
    display : "flex",
    justifyContent : 'center',
    alignItems : "center",
    // backgroundColor : 'lightblue',
    borderBottomWidth : 1,
  },
  Box_set_main : {
    height : 65,
    display : 'flex',
    flexDirection : 'row',
    backgroundColor : 'white',
    alignItems : 'center',
    justifyContent : 'space-between',
    borderBottomWidth : 1,
    borderBottomColor : 'lightgray'
  },
})
