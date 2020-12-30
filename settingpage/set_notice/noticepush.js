import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class Noticepush extends Component {
  render() {
    return (
      <View style={styles.Noticecon_noticepush}>
        <Text style={styles.Noticetext_noticepush}>{this.props.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Noticecon_noticepush: {
    display: 'flex',
    justifyContent: 'center',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    height: 40,
  },
  Noticetext_noticepush: {
    fontFamily: 'Jalnan',
    fontSize: 18,
    marginLeft: 15,
  },
});
