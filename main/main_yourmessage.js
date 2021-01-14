import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Main_Yourmessage extends React.Component {
  render() {
    if (this.props.pre === true) {
      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 5,
            marginTop: 5,
          }}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                display: 'flex',
                backgroundColor: '#eaeaea',
                marginRight: 10,
                marginLeft: 16,
                maxWidth: '70%',
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 28,
              }}>
              <Text style={{fontSize: 18}}>{this.props.message}</Text>
            </View>
            <View style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Text style={{fontSize: 12}}>{this.props.time}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 5,
            marginTop: 5,
          }}>
          <View style={{marginLeft: 22, marginBottom: 10, display: 'flex'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {this.props.nickname}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                display: 'flex',
                backgroundColor: '#c7d9ff',
                marginRight: 10,
                marginLeft: 16,
                maxWidth: '70%',
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 28,
              }}>
              <Text style={{fontSize: 18}}>{this.props.message}</Text>
            </View>
            <View style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Text style={{fontSize: 12}}>{this.props.time}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});
