import React, { Component } from 'react'
import {View, Image, Text, Animated, SafeAreaView, StyleSheet } from 'react-native';

export default class Splash extends Component {
    state ={
        animation : new Animated.Value(0)
    }
    componentDidMount() {
        Animated.timing(
            this.state.animation,
            {
                toValue : 1,
                duration : 500,
                useNativeDriver:true
            }
        ).start();
    }

    render() {
        const animationStyles = {
            opacity : this.state.animation
        };
        return (
            <SafeAreaView style= {styles.splash_con}>
                <Animated.View style = {[styles.splash_ani, animationStyles]}>
                    <Text>ㅇㄱㅇㄱ</Text>
                </Animated.View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create ({
    splash_con :{
        display : 'flex',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    splash_ani:{
        backgroundColor : 'pink',
        width :300,
        height : 300,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
    }
})