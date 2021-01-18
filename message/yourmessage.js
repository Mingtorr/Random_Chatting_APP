import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Linking, Clipboard, TouchableOpacity, Alert} from 'react-native';

export default class Yourmessage extends PureComponent {
  copyToClipboard = () => {
    Clipboard.setString(this.props.message)
    Alert.alert('','텍스트가 복사되었습니다.')
  }
  render() {
    if (this.props.message == 'delcode5010') {
      return (
        <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View style={{display: 'flex'}}>
              <View style={{display: 'flex'}}>
                <Text style={{fontSize: 20, fontFamily: 'Jalnan'}}>
                  상대방이 나갔습니다.
                </Text>
              </View>
            </View>
          </View>
      );
    } else if (this.props.pre === true) {
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
                  :<Text style={{fontSize: 14, color: 'black'}}>
                    {this.props.message}
                  </Text> }
              </View>
              <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 10}}>{this.props.time}</Text>
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
            <View style={{marginLeft: 22, marginBottom: 10, display: 'flex'}}>
              <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                {this.props.name}
              </Text>
            </View>
            
            <TouchableOpacity onLongPress = {this.copyToClipboard}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  display: 'flex',
                  backgroundColor: '#eaeaea',
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
                  :<Text style={{fontSize: 14, color: 'black'}}>
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
