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
          <Text style={{fontSize: 10}}>{this.props.time}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            backgroundColor: '#eaeaea',
            marginRight: 16,
            maxWidth: '70%',
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 8,
            paddingTop: 8,
            borderRadius: 20,
          }}>
          {/* <Text style={{color: this.props.animate_boolean ? 'black': 'white', fontSize: 14}}>{this.props.message}</Text> */}
          <Text style={{color: 'black', fontSize: 14}}>{this.props.message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
