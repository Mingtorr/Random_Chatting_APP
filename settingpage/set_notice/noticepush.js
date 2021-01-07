import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, SafeAreaView} from 'react-native';
let wesix = require('./wesix.png');
export default class Noticepush extends Component {
  render() {
    return (
      <SafeAreaView style={styles.Noticecon_noticepush}>
        <Image
          style={{height: 50, width: 50, borderWidth: 1, borderRadius: 100}}
          source={wesix}
        />
        <View style={{width: '5%'}}></View>
        <View style={{width: '70%', alignSelf: 'stretch'}}>
          <Text style={styles.text_noticepush}>wesix</Text>
          <Text style={styles.Noticetext_noticepush}>{this.props.content}</Text>
        </View>
        <View>
          <Text style={styles.date_noticepush}>{this.props.date}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Noticecon_noticepush: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 70,
    flexDirection: 'row',
  },
  Noticetext_noticepush: {
    fontFamily: 'Jalnan',
    fontSize: 18,
    marginTop: 6,
  },
  text_noticepush: {
    fontFamily: 'Jalnan',
    fontSize: 10,
    marginTop: 4,
  },
  date_noticepush: {
    fontFamily: 'Jalnan',
    fontSize: 15,
  },
});
