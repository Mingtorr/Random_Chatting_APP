import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Picker,
} from 'react-native';
export default class Creatgroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pw: '',
      pw2: '',
      major: '',
      hnumber: '',
      email: '',
      injung: '',
      sex: '',
      selectmajor: '학과 선택',
      selectedValue: '2대2',
    };
  }
  setSelectedValue = (itemValue) => {
    this.setState({
      selectedValue: itemValue,
    });
  };
  onclose = () => {
    this.props.closemodal();
  };
  render() {
    let radio_props = [
      //radio button
      {label: '남    ', value: 0},
      {label: '여', value: 1},
    ];

    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
        <View style={{backgroundColor: 'white', flex: 0.2}}>
          <TouchableOpacity
            style={{display: 'flex', marginLeft: 20, marginTop: 20}}
            onPress={this.onclose}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../Image/cancel.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              backgroundColor: 'white',
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 15, color: '#f05052', fontFamily: 'Jalnan'}}>
              와글와글
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              backgroundColor: 'white',
              flex: 0.5,
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 34, color: '#f05052', fontFamily: 'Jalnan'}}>
              모임 만들기
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flex: 0.15,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, marginBottom: 10}}>
            상대방이 신청할시 서로에게 메시지가 갑니다.
          </Text>
          <Text style={{fontSize: 18}}>
            서로 매칭이 되면 글이 사라지니 주의하세요
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            flex: 0.23,
          }}>
          <Text
            style={{
              fontFamily: 'Jalnan',
              fontSize: 20,
              color: '#f05052',
              marginBottom: 15,
              marginLeft: 30,
              marginTop: 0,
            }}>
            본문 내용
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'white',
              flex: 0.9,
              justifyContent: 'center',
            }}>
            <TextInput
              style={{
                display: 'flex',
                flex: 0.9,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
              }}
              multiline={true}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flex: 0.34,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Jalnan',
              fontSize: 24,
              color: '#f05052',
              marginTop: 10,
            }}>
            인원 선택하기{' '}
          </Text>
          <Picker
            selectedValue={this.state.selectedValue}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }>
            <Picker.Item label="2대2" value="2대2" />
            <Picker.Item label="3대3" value="3대3" />
            <Picker.Item label="4대4" value="4대4" />
            <Picker.Item label="5대5" value="5대5" />
            <Picker.Item label="6명이상" value="6명이상" />
          </Picker>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#f05052',
            display: 'flex',
            flex: 0.08,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: 'Jalnan', fontSize: 20}}>
            다음
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
