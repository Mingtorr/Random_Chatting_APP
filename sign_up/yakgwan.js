import React, {PureComponent} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import Yakgwantext from './yakgwantxt';

class Yakgwan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onoff: true,
    };
  }
  componentDidMount() {
    this.setState({
      onoff: true,
    });
  }
  clockbutton = (e) => {
    this.setState({
      onoff: false,
    });
  };
  click = (e) => {
    this.setState({onoff: false});
    this.props.go(true);
  };
  render() {
    return (
      <Modal
        isVisible={this.state.onoff}
        style={{display: 'flex', justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            width: '98%',
            height: '90%',
            marginLeft: '1%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{display: 'flex', flex: 0.25}}>
              <TouchableOpacity
                style={{marginTop: 10, marginLeft: 10}}
                onPress={this.click}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../Image/cancel.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'jalnan',
                  color: '#f05052',
                  marginTop: 20,
                  fontSize: 20,
                }}>
                약관 동의
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flex: 0.25,
              }}></View>
          </View>

          <Text
            style={{
              alignSelf: 'center',
              marginTop: 20,
              fontSize: 15,
            }}>
            개인정보 이용약관
          </Text>

          <ScrollView
            style={{
              alignSelf: 'center',
              width: '95%',
              //   marginLeft: '2.5%',
              //   height: '10%',
              //   borderWidth: 1,
              //   backgroundColor: 'rgb(215,215,215)',
              //   borderRadius: 12,
              //   padding: 7,
              marginTop: 10,
              marginBottom: 15,
              paddingTop: 7,
              paddingLeft: 7,
              paddingRight: 7,
              paddingBottom: 20,
              borderTopWidth: 1,
              //   borderBottomWidth: 1,
            }}>
            <Yakgwantext />
          </ScrollView>

          <TouchableOpacity
            style={{
              //   marginTop: 25,
              color: 'white',
              fontFamily: 'Jalnan',
              //   paddingLeft: 30,
              paddingTop: 10,
              //   paddingRight: 100,
              paddingBottom: 10,
              fontSize: 20,
              backgroundColor: '#f05052',
              //   marginBottom: 10,
              width: '100%',
              //   marginTop: 20,
              marginBottom: 5,
            }}
            onPress={this.clockbutton}>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'Jalnan',
                fontWeight: '700',
                fontSize: 20,
                textAlign: 'center',
                width: '100%',
              }}>
              모든 약관을 확인했습니다
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default Yakgwan;
