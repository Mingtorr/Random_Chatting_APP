
import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default class Main extends Component {
    goLog =(e)=>{
        e.preventDefault();
        this.props.navigation.navigate('Login')
    }
    goMsg =(e)=>{
        e.preventDefault();
        this.props.navigation.navigate('Message')
    }
    render() {
        return (
            <View style={styles.Container_main}>
                <View style ={styles.Top_main}>
                    <Text>마크</Text>
                </View>
                {/* 이동쉽게 만들어놓은거 */} 
                <Button title ="로그인으로 가기" onPress={this.goLog}/>
                <Button title ="채팅페이지로 가기" onPress ={this.goMsg}/>
            </View>
        )
    }
    
}
const styles = StyleSheet.create({
    Container_main:{
        display: "flex",
        flex:1,
        justifyContent:"space-between",
        backgroundColor:"#c7d9ff"
      },
    Top_main : {
        display : "flex",
        height : 50,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        backgroundColor : "white",
    }
})
