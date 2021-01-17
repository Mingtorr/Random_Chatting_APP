import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Firstmessage extends PureComponent {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginBottom: 10,
          marginTop: 20,
          alignItems: 'center',
        }}>
        <View style={{display: 'flex'}}>
          <View style={{display: 'flex'}}>
            <Text style={{fontSize: 12, fontFamily: 'Jalnan'}}>
              {this.props.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
