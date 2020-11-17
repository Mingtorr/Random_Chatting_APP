import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'

export default class Set_privacy extends Component {
  render() {
    return (
      <SafeAreaView style={styles.Container_privacy}>
        <View style = {styles.Header_privacy}>
          <TouchableOpacity style = {styles.back_privacy} onPress={() => this.props.navigation.goBack()}>
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <View style = {styles.Head_privacy}>
            <Text>Setting</Text>
            <Text>회원정보 수정</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  Container_privacy :{
    display : 'flex',
  },
  Header_privacy :{
    height : 50,
    display : 'flex',
    justifyContent :'space-between',
    alignItems : 'center',
    flexDirection : 'row',
    borderBottomWidth :1,
  },
  back_privacy : {
    marginLeft : 30,
  },
  Head_privacy : {
    width : '100%',
    position : 'absolute',
    alignSelf :'center',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  }
})
