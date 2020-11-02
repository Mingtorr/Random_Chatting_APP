import React, { Component } from 'react'
import {View, Image} from 'react-native';

export default class Splash extends Component {
    render() {
        return (
            <View>
                 <Image
            style={{height:'100%',width:'100%'}}
            source={require('./Screen.png')}/>
            </View>
        )
    }
}
