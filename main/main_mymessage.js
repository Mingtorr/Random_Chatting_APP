import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Main_Mymessage extends React.Component {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 5,
          marginTop: 5,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 10,
          }}>
          <Text style={{fontSize: 12}}>{this.props.time}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            backgroundColor: '#eb6c63',
            marginRight: 16,
            maxWidth: '70%',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 28,
          }}>
          <Text style={{color: this.props.animate_boolean ? 'white': 'black', fontSize: 18}}>{this.props.message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
