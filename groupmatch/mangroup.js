import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

export default class Mangroup extends React.Component {
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 110,
          borderWidth: 1,
          borderColor: '#b4cbff',
          marginLeft: 5,
          marginBottom: 5,
          marginTop: 5,
          marginRight: 5,
          borderRadius: 24,
        }}>
        <View style={{display: 'flex', flex: 0.21, marginLeft: 20}}>
          <Text
            style={{
              display: 'flex',
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontFamily: 'jalnan',
              color: '#b4cbff',
            }}>
            남자 3명
          </Text>
          <View
            style={{
              display: 'flex',
              backgroundColor: '#dcdcdc82',
              width: 60,
              height: 60,
              borderRadius: 100,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5,
            }}>
            <Image
              style={{width: 60, height: 60}}
              source={require('./boy.png')}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flex: 0.6,
            flexDirection: 'column',
            marginTop: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flex: 0.35,
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {this.props.nickname}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flex: 0.7,
              alignItems: 'flex-start',
              marginLeft: 10,
            }}>
            <Text style={{fontSize: 14}}>{this.props.body}</Text>
          </View>
        </View>
        <View style={{display: 'flex', flex: 0.2, flexDirection: 'column'}}>
          <View
            style={{
              display: 'flex',
              flex: 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 13}}>{this.props.time}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flex: 0.7,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Text
                style={{color: '#b4cbff', fontWeight: 'bold', fontSize: 15}}>
                과팅신청
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
