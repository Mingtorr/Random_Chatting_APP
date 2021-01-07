import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
  Image,
  UselessTextInput,
  FlatList,
  Dimensions,
  Keyboard,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
const Width_ = Dimensions.get('window').width * 0.9;
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default class Group_req extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View
          style={{
            width: Width + 10,
            height: Height + 1000,
            backgroundColor: 'black',
            position: 'absolute',
            // zIndex: 0,
            left: '-8%',
            opacity: 0.5,
            top: '-90%',
          }}></View>
        <View
          style={{
            width: Width_,
            height: 350,
            backgroundColor: 'white',
            //   shadowColor: '#000000',
            //   shadowOpacity: 0.6,
            //   shadowOffset: {width: 2, height: 2},
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Jalnan',
              textAlign: 'center',
              marginTop: 25,
            }}>
            채팅방 만들기
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 15,
            }}>
            제목을 입력해주세요!
          </Text>
          <TextInput
            style={{
              height: 30,
              borderColor: 'gray',
              borderBottomWidth: 1,
              width: '80%',
              marginLeft: '10%',
              textAlign: 'center',
              marginTop: 5,
            }}
            //   onChangeText={(text) => onChangeText(text)}
            //   value={value}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <Text
              style={{
                marginLeft: '20%',
              }}>
              인원
            </Text>
            <RNPickerSelect
              style={{
                inputAndroid: {
                  justifyContent: 'center',
                  textAlign: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  placeholderColor: '#ababa',
                  borderRadius: 5,
                  // borderWidth: 0.5,
                  fontWeight: 'bold',
                  backgroundColor: '#e9ecef',
                  height: 40,
                  color: 'gray',
                },
                inputIOS: {
                  justifyContent: 'center',
                  fontSize: 16,
                  textAlign: 'center',
                  // paddingHorizontal: 10,
                  // paddingVertical: 8,
                  placeholderColor: '#ababa',
                  // borderWidth: 0.5,
                  borderRadius: 5,
                  fontWeight: 'bold',
                  color: 'gray',
                  // height: 40,
                  backgroundColor: '#e9ecef',
                  width: 100,
                  marginRight: '15%',
                  height: 20,
                },
              }}
              placeholder={
                {
                  // label: '학과선택',
                  // value: null,
                }
              }
              onValueChange={(value) => this.setState({major: value})}
              items={[
                {label: '2', value: 'all'},
                {label: '2', value: 'all'},
                {label: '3', value: 'computer engineering'},
                {label: '4', value: 'baseball'},
                {label: '5', value: 'hockey'},
                {label: '6', value: 'hockey'},
                {label: '7', value: 'hockey'},
                {label: '8', value: 'hockey'},
                {label: '9', value: 'hockey'},
                {label: '10', value: 'hockey'},
                {label: '20', value: 'hockey'},
                {label: '30', value: 'hockey'},
              ]}
            />
            <Text
              style={{
                position: 'absolute',
                right: '18%',
                marginTop: 2,
                color: 'gray',
              }}>
              ▼
            </Text>
          </View>
          <TextInput
            placeholder="#해시태그로 채팅방을 소개해주세요!"
            style={{
              height: '30%',
              width: '70%',
              marginLeft: '15%',
              borderColor: 'gray',
              // borderWidth: 1,
              backgroundColor: '#e9ecef',
              borderRadius: 5,
              padding: 10,
              marginTop: 20,
            }}
            multiline={true}
            numberOfLines={4}
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E94e68', '#eb6c63']}
            style={styles.linearGradient}
            style={{
              backgroundColor: '#E94e68',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              height: 50,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontFamily: 'Jalnan',
                color: 'white',
              }}>
              만들기
            </Text>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  matching_tab_bg: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});
