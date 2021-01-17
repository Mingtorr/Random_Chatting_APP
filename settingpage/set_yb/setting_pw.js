import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import RadioForm from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-community/async-storage';

const func = require('../../server/api');

class ChangePW extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwd: '',
      passwd2: '',
      userkey: '',
      checking_passwd: false, //비번 확인
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      this.setState({
        userkey: JSON.parse(result).user_key,
      });
    });
  }

  singupBtn = (e) => {
    e.preventDefault();

    var checkpass = this.state.passwd;
    checkpass = checkpass.replace(/(\s*)/g, '');
    if (!this.state.checking_passwd) {
      Alert.alert(
        '안내',
        '비밀번호가 일치하지 않습니다',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
    } else if (checkpass === '') {
      Alert.alert(
        '안내',
        '비밀번호에 공백은 들어가서는 안됩니다',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
    } else {
      const user_info = {
        user_key: this.state.userkey,
        passwd: this.state.passwd,
      };
      fetch(func.api(3009, 'changPW'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user_info),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json === true) {
            this.props.navigation.goBack(null);
          }
        });
    }
  };

  check = (re, what, title, message) => {
    if (re.test(what)) {
      return true;
    }
    Alert.alert(title, message, [{text: 'OK', style: 'OK'}], {
      cancelable: false,
    });
    return false;
  };

  passwdcheck = (e) => {
    if (this.state.passwd.length === 0 || this.state.passwd2.length === 0) {
      Alert.alert(
        '안내',
        '비밀번호를 입력해주세요',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
    } else if (this.state.passwd !== this.state.passwd2) {
      Alert.alert(
        '안내',
        '비밀번호가 일치하지 않습니다',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
    } else if (this.state.passwd === this.state.passwd2) {
      Alert.alert(
        '안내',
        '비밀번호가 일치합니다',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
      this.setState({
        checking_passwd: true,
      });
    }
  };

  render() {
    let radio_props = [
      //radio button
      {label: '남    ', value: 0},
      {label: '여', value: 1},
    ];

    let screenHeight =
      Dimensions.get('window').height - getStatusBarHeight() - getBottomSpace();

    return (
      <SafeAreaView
        style={{backgroundColor: 'white', flex: 1, backgroundColor: 'white'}}>
        <KeyboardAwareScrollView
          // behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.Container_sign2}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              // style={styles.White_sign}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                backgroundColor: 'white', //dadfa
                height: screenHeight,
              }}>
              <View style={styles.Container_sign}>
                <TouchableOpacity
                  style={{marginTop: 20, position: 'absolute', left: '5%'}}
                  onPress={() => this.props.navigation.goBack()}>
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('./cancel.png')}
                  />
                </TouchableOpacity>

                <View>
                  <View style={styles.Textbox_sign2}>
                    <Text style={styles.Intro_sign}>와글와글</Text>
                  </View>
                  <View style={styles.Textbox_sign}>
                    <Text style={styles.Intro_sign2}>비밀번호 변경</Text>
                  </View>
                </View>

                <View style={styles.Text_sign}>
                  <Text style={styles.Text_sign_text}>비밀번호</Text>
                  <View style={{height: 20}}>
                    <TextInput
                      style={styles.Text_sign_input2}
                      id="passwd"
                      name="passwd"
                      value={this.state.passwd}
                      secureTextEntry={true}
                      onChangeText={(text) =>
                        this.setState({passwd: text, checking_passwd: false})
                      }
                    />
                  </View>
                </View>

                <View style={styles.Text_sign}>
                  <Text style={styles.Text_sign_text}>비밀번호 확인</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInput
                      style={styles.Text_sign_input2}
                      id="passwd2"
                      name="passwd2"
                      value={this.state.passwd2}
                      secureTextEntry={true}
                      onChangeText={(text) => this.setState({passwd2: text})}
                    />
                    <TouchableOpacity
                      style={styles.Btn_sign2id}
                      onPress={this.passwdcheck}>
                      <Text
                        style={{
                          color: 'gray',
                          fontWeight: '700',
                          fontSize: 15,
                        }}>
                        확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{height: 400}}>{/* 공백 */}</View>

                <View>
                  <TouchableOpacity
                    style={{
                      marginTop: 25,
                      color: 'white',
                      fontFamily: 'Jalnan',
                      paddingLeft: 30,
                      paddingTop: 10,
                      paddingRight: 30,
                      paddingBottom: 10,
                      fontSize: 20,
                      backgroundColor: '#f05052',
                      marginBottom: 10,
                      width: 1000,
                    }}
                    onPress={this.singupBtn}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Jalnan',
                        fontSize: 20,
                        textAlign: 'center',
                        width: '100%',
                      }}>
                      변경하기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  White_sign: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: 'white', //dadfa
    // height:'100%'
  },
  Container_sign: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center', //추가된거
    // justifyContent:"space-evenly",
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    // borderRadius:60,
    ...Platform.select({
      ios: {
        width: '95%',
      },
      android: {
        width: '100%',
      },
    }),
  },
  Container_sign2: {
    display: 'flex',
    flexDirection: 'column',
    // flex:1,
    // borderRadius:60,
    // height:'100%'
  },
  Textbox_sign: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Textbox_sign2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:30
  },
  Intro_sign: {
    marginTop: 0,
    fontSize: 15,
    color: '#f05052',
    fontFamily: 'Jalnan',
    marginTop: 10,

    ...Platform.select({
      ios: {
        marginBottom: 10,
      },
      android: {
        marginBottom: 0,
      },
    }),
  },
  Intro_sign2: {
    marginTop: 0,
    fontSize: 30,
    // color:"#4f87ba",
    color: '#f05052',
    fontFamily: 'Jalnan',
  },
  Text_sign: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

    ...Platform.select({
      ios: {
        marginTop: 15,
      },
      android: {
        marginTop: 10,
      },
    }),
  },
  Text_sign_black: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',

    ...Platform.select({
      ios: {
        marginTop: 15,
      },
      android: {
        marginTop: 0,
      },
    }),
  },
  Text_sign_sex: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    marginTop: 15,

    ...Platform.select({
      ios: {
        justifyContent: 'space-around',
      },
      android: {
        marginBottom: 10,
      },
    }),
    // borderBottomWidth:1,
    // borderBottomColor:'gray'
  },

  Text_sign_text: {
    fontFamily: 'Jalnan',
    fontSize: 15,
    color: '#f05052',
    // marginRight:80,

    ...Platform.select({
      ios: {
        marginBottom: 15,
      },
      android: {
        marginBottom: 5,
      },
    }),
  },
  Text_sign_text_sex: {
    fontFamily: 'Jalnan',
    fontSize: 15,
    color: '#f05052',

    ...Platform.select({
      ios: {
        marginRight: 60,
      },
      android: {
        marginRight: 100,
      },
    }),
  },
  Text_sign_input: {
    display: 'flex',
    color: 'black',
    flex: 0.9,
    height: 20,
    fontSize: 15,
    marginLeft: 0,
    padding: 0,
  },
  Text_sign_input2: {
    display: 'flex',
    color: 'black',
    flex: 0.9,
    height: 20,
    fontSize: 15,
    marginLeft: 0,
    padding: 0,
  },
  Btn_sign: {
    borderWidth: 0,
    marginTop: 25,
    color: 'white',
    borderRadius: 60,
    fontFamily: 'Jalnan',
    paddingLeft: 30,
    paddingTop: 3,
    paddingRight: 30,
    paddingBottom: 3,
    fontSize: 20,
    backgroundColor: '#f05052',
    elevation: 8,
    marginBottom: 10,
  },
  Btn_sign2id: {
    borderWidth: 0,
    // marginTop:25,
    color: 'white',
    borderRadius: 60,
    fontFamily: 'Jalnan',
    paddingLeft: 10,
    paddingTop: 5,
    // paddingRight:10,
    paddingBottom: 5,
    fontSize: 20,
    // backgroundColor:'#f05052',
    marginBottom: 5,
    marginRight: 0,
    marginTop: 0,
  },

  Btn_sign2: {
    borderWidth: 0,
    // marginTop:25,
    color: 'white',
    borderRadius: 60,
    fontFamily: 'Jalnan',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 20,
    backgroundColor: '#f05052',
    marginBottom: 5,
    marginRight: -15,
    marginTop: -4,
  },

  sign_explain: {
    ...Platform.select({
      ios: {
        marginTop: 15,
      },
      android: {
        marginTop: 10,
      },
    }),
  },
  sign_button: {
    fontSize: 15,
    fontFamily: 'Jalnan',
    color: 'gray',
    marginRight: -15,
    // marginBottom:-30,
    paddingBottom: -30,
  },
  sel_placeholder: {
    color: 'red',
  },
  bar_Btn_sign: {
    // borderWidth:0,
    color: 'white',
    // borderRadius:60,
    fontFamily: 'Jalnan',
    paddingLeft: 30,
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 15,
    fontSize: 20,
    backgroundColor: '#f05052',
    // elevation:8,
    marginBottom: 10,
    width: 1000,
    // textAlign: 'center',

    ...Platform.select({
      ios: {
        marginTop: 25,
      },
      android: {
        marginTop: 15,
      },
    }),
  },
});
export default withNavigation(ChangePW);
