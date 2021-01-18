import React from 'react';
import {StyleSheet, View, Text, Linking, Clipboard, TouchableOpacity, Alert} from 'react-native';

export default class Main_Yourmessage extends React.PureComponent {
  copyToClipboard = () => {
    Clipboard.setString(this.props.message)
    Alert.alert('','텍스트가 복사되었습니다.')
  }

  render() {
    if (this.props.pre === true) {
      return (
        <View>
          <TouchableOpacity onLongPress = {this.copyToClipboard}>
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
                    // backgroundColor: '#eb6c63',
                    marginRight: 10,
                    marginLeft: 16,
                    maxWidth: '70%',
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 10,
                    paddingTop: 10,
                    borderRadius: 28,
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
                <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Text style={{fontSize: 12}}>{this.props.time}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
          <View style={{marginLeft: 22, marginBottom: 5, display: 'flex'}}>
            <Text style={{fontSize: 13, fontWeight: 'bold'}}>
              {this.props.nickname}
            </Text>
          </View>

          <TouchableOpacity onLongPress = {this.copyToClipboard}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  display: 'flex',
                  // backgroundColor: '#c7d9ff',
                  backgroundColor: '#eb6c63',
                  marginRight: 10,
                  marginLeft: 16,
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
              <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 10}}>{this.props.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});
