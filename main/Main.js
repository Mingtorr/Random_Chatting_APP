
import React, { Component } from 'react'
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default class Main extends Component {
    render() {
        return (
            <View style={styles.Container_main}>
                <View style ={styles.Top_main}>
                    <Text>마크</Text>
                </View>
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
