import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Linking, Clipboard, TouchableOpacity, Alert} from 'react-native';

export default class Mymessage extends PureComponent {
  copyToClipboard = () => {
    Clipboard.setString(this.props.message)
    Alert.alert('','텍스트가 복사되었습니다.')
  }
  render() {
    return (
      <View>
      <TouchableOpacity onLongPress = {this.copyToClipboard}>
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
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: 10,
            }}>
            <Text style={{fontSize: 10}}>{this.props.time}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              backgroundColor: '#eb6c63',
              marginRight: 16,
              maxWidth: '70%',
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 8,
              paddingTop: 8,
              borderRadius: 20,
            }}>
              {this.props.message.includes('http://') || this.props.message.includes('https://') // 링크접속하는곳
              ?<Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(this.props.message)}>
                {this.props.message}
              </Text>
              :<Text style={{fontSize: 14, color: 'white'}}>
                {this.props.message}
              </Text> }
          </View>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
