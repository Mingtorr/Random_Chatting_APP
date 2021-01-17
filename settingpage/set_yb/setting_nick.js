import React, {PureComponent} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-community/async-storage';

const func = require('../../server/api');

class Set_yb extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      userkey: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      this.setState({
        userkey: JSON.parse(result).user_key,
      });
    });
  }
  check = (re, what, title, message) => {
    if (re.test(what)) {
      return true;
    }
    Alert.alert(title, message, [{text: 'OK', style: 'OK'}], {
      cancelable: false,
    });
    return false;
  };
  nickNamecheck = (e) => {
    e.preventDefault();
    e.preventDefault();
    var re = /^[a-zA-Z0-9가-힣]{2,8}$/;
    if (
      !this.check(
        re,
        this.state.text,
        '안내',
        '닉네임은 2~8자의 영문,한글 ,숫자로만 입력가능합니다.',
      )
    ) {
      return;
    } else {
      const box = {
        nickname: this.state.text,
        userkey: this.state.userkey,
      };
      // console.log(box);
      fetch(func.api(3009, 'changeNickname'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(box),
      })
        .then((res) => res.json())
        .then((json) => {
          AsyncStorage.mergeItem(
            'login_user_info',
            JSON.stringify({
              login_set: 'true',
              user_key: json.user_key,
              user_id: json.user_id,
              user_sex: json.user_sex,
              user_email: json.user_email,
              user_deptno: json.user_deptno,
              user_stdno: json.user_stdno,
              user_nickname: json.user_nickname,
            }),
          );
          const data = {
            id: this.props.route.params.data.id,
            nickname: this.state.text,
            deptno: this.props.route.params.data.deptno,
            stdno: this.props.route.params.data.stdno,
            email: this.props.route.params.data.email,
          };
          this.props.route.params.changenick(
            data.id,
            data.nickname,
            data.deptno,
            data.stdno,
            data.email,
          );
          this.props.navigation.navigate('Set_privacy');
        });
    }
  };

  message_onchange = (e) => {
    this.setState({
      text: e,
    });
  };
  backBtn = () => {
    this.props.navigation.goBack(null);
  };
  render() {
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
                    <Text style={styles.Intro_sign2}>닉네임 변경</Text>
                  </View>
                </View>

                <View style={styles.Text_sign}>
                  <Text style={styles.Text_sign_text}>닉네임</Text>
                  <View style={{height: 20}}>
                    <TextInput
                      style={styles.Text_sign_input2}
                      id="text"
                      name="text"
                      value={this.state.text}
                      secureTextEntry={false}
                      onChangeText={this.message_onchange}
                    />
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
                    onPress={this.nickNamecheck}>
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
    zIndex: 0,
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
    backgroundColor: 'white',
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
const Dissable = ({children}) => (
  <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
);
export default withNavigation(Set_yb);
