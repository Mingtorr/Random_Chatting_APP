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
const func = require('../server/api');

class Sign_up extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      passwd: '',
      passwd2: '',
      email: '',
      authNum: '', //보낸 인증번호
      authCheckNum: '', // 사용자가 적은 인증번호
      sex: '0', // 0:남자, 1:여자
      nickname: '',

      checked_id: false, // ID 중복검사
      checked_email: false, // 메일 인증 확인
      sendEmailClick: false, //메일 보냄 확인
      checking_passwd: false, //비번 확인
      nickname_check: false, //닉네임 중복검사
    };
  }

  singupBtn = (e) => {
    e.preventDefault();

    var checkpass = this.state.passwd;
    checkpass = checkpass.replace(/(\s*)/g, '');

    if (!this.state.checked_id) {
      Alert.alert(
        '안내',
        '아이디 중복검사를 해주세요',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
    } else if (!this.state.checking_passwd) {
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
    } else if (!this.state.nickname_check) {
      Alert.alert(
        '안내',
        '닉네임 중복 검사를 해주세요',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
    } else if (!this.state.checked_email) {
      Alert.alert('안내', '메일 인증을 해주세요', [{text: 'OK', style: 'OK'}], {
        cancelable: false,
      });
    } else {
      const user_info = {
        id: this.state.id,
        passwd: this.state.passwd2,
        sex: this.state.sex,
        nickname: this.state.nickname,
        email: this.state.email,
      };
      fetch(func.api(3001, 'Signup'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user_info),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            console.log('singup2');
            this.props.navigation.navigate('Signup2', {
              user_id: this.state.id,
            });
          }
        });
    }
  };

  sendEmail = (e) => {
    e.preventDefault();
    if (this.state.email.length === 0) {
      Alert.alert(
        '안내',
        '이메일을 입력해주세요!',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
      return;
    } else if (this.state.email.length > 15) {
      Alert.alert(
        '안내',
        '이메일을 확인해주세요!',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
      return;
    } else if (
      !this.check(re, this.state.email, '안내', '잘못된 형식의 이메일입니다')
    ) {
      return;
    } else {
      this.setState({
        sendEmailClick: true,
      });
      const email = {
        sendEmail: this.state.email,
      };
      fetch(func.api(3001, 'Sendmail'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(email),
      })
        .then((res) => res.json())
        .then((json) => {
          Alert.alert(
            '안내',
            '인증 메일이 전송되었습니다',
            [{text: 'OK', style: 'OK'}],
            {cancelable: false},
          );
          this.setState({
            authNum: json,
          });
          console.log('인증번호', this.state.authNum);

          // 테스트 (메일인증x)
          // if (json === true) {
          //   Alert.alert(
          //     "안내",
          //     "이미 가입된 메일입니다",
          //     [{text: "OK", style: "OK"}],
          //     { cancelable: false }
          //   );
          // } else {
          //   Alert.alert(
          //     "안내",
          //     "인증 메일이 전송되었습니다",
          //     [{text: "OK", style: "OK"}],
          //     { cancelable: false }
          //   );
          //   this.setState({
          //     authNum: json,
          //   });
          // }
        });
    }
  };

  // 인증메일을 확인한다.
  authEmail = (e) => {
    e.preventDefault();
    if (this.state.authCheckNum.length === 0) {
      Alert.alert(
        '안내',
        '인증번호를 입력해주세요',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
      return;
    }
    if (this.state.authNum.toString() === this.state.authCheckNum.toString()) {
      Alert.alert('안내', '인증성공', [{text: 'OK', style: 'OK'}], {
        cancelable: false,
      });
      this.setState({
        checked_email: true,
      });
    } else {
      Alert.alert('안내', '인증실패', [{text: 'OK', style: 'OK'}], {
        cancelable: false,
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

  checkId = (e) => {
    e.preventDefault();
    var re = /^[a-zA-Z0-9]{4,12}$/; //아이디는 4~12자의 영문 대소문자와 숫자로만 입력
    if (
      !this.check(
        re,
        this.state.id,
        '안내',
        '아이디는 4~12자의 영문 대소문자와 숫자로만 입력가능합니다.',
      )
    ) {
      return;
    } else {
      const checkId = {
        id: this.state.id,
      };
      fetch(func.api(3001, 'CheckId'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(checkId),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            Alert.alert(
              '안내',
              '사용 가능한 아이디입니다',
              [{text: 'OK', style: 'OK'}],
              {cancelable: false},
            );
            this.setState({
              checked_id: true,
            });
          } else {
            Alert.alert(
              '안내',
              '이미 사용중인 아이디입니다',
              [{text: 'OK', style: 'OK'}],
              {cancelable: false},
            );
          }
        });
    }
  };

  nickNamecheck = (e) => {
    e.preventDefault();
    var re = /^[a-zA-Z0-9가-힣]{2,8}$/;
    if (
      !this.check(
        re,
        this.state.nickname,
        '안내',
        '닉네임은 2~8자의 영문,한글 ,숫자로만 입력가능합니다.',
      )
    ) {
      return;
    } else {
      const box = {
        nickname: this.state.nickname,
      };
      // console.log(box);
      fetch(func.api(3001, 'CheckNickname'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(box),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            Alert.alert(
              '안내',
              '사용가능한 닉네임입니다',
              [{text: 'OK', style: 'OK'}],
              {cancelable: false},
            );
            this.setState({
              nickname_check: true,
            });
          } else {
            Alert.alert(
              '안내',
              '이미 사용중인 닉네임입니다',
              [{text: 'OK', style: 'OK'}],
              {cancelable: false},
            );
          }
        });
    }
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

  //////////////////////////
  onSubmit = (e) => {
    e.preventDefault(); //이벤트 발생시 새로고침을 안하게 한다.
    var checkpass = this.state.passwd;
    checkpass = checkpass.replace(/(\s*)/g, '');
    console.log(checkpass.charAt(0));
    if (this.state.id.length > 100 || this.state.passwd.length > 100) {
      alert('아이디와 비밀번호의 길이가 너무 깁니다!!');
      return;
    }
    if (!this.state.checked_id) {
      alert('아이디 중복검사를 해주세요');
    } else if (!(this.state.passwd === this.state.passwd2)) {
      alert('비밀번호가 일지하지 않습니다.');
    } else if (checkpass === '') {
      alert('비밀번호에 공백은 들어가서는 안됩니다.');
    } else if (!this.state.checked_email) {
      alert('메일 인증을 해주세요');
    } else {
      const user_info = {
        id: this.state.id,
        passwd: this.state.passwd2,
        email: this.state.email,
      };
      fetch(func.api(3001, 'Signup'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user_info),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert('회원가입 성공');
          } else {
            alert('회원가입 실패');
          }
        });
    }
  };
  /////////////////////

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
                    <Text style={styles.Intro_sign2}>회원 가입</Text>
                  </View>
                </View>

                <View style={styles.Text_sign}>
                  <Text style={styles.Text_sign_text}>아이디</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInput
                      style={styles.Text_sign_input}
                      id="id"
                      value={this.state.id}
                      onChangeText={(text) =>
                        this.setState({id: text, checked_id: false})
                      }
                    />
                    {/* <TouchableOpacity style={{padding:-30}} onPress={this.singupBtn}>
                  <Text style={styles.sign_button}>중복확인</Text>
              </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.Btn_sign2id}
                      onPress={this.checkId}>
                      <Text
                        style={{
                          color: 'gray',
                          fontFamily: 'Jalnan',
                          fontSize: 15,
                        }}>
                        중복확인
                      </Text>
                    </TouchableOpacity>
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
                          fontFamily: 'Jalnan',
                          fontSize: 15,
                        }}>
                        중복확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.Text_sign_sex}>
                  <Text style={styles.Text_sign_text_sex}>성별</Text>
                  <RadioForm
                    buttonColor={'#f05052'}
                    labelColor={'black'}
                    formHorizontal={true}
                    buttonSize={10}
                    radio_props={radio_props}
                    // buttonWrapStyle={{marginLeft: 10, marginRight: 10}}
                    borderWidth={0.5}
                    initial={0}
                    onPress={(value) => {
                      this.setState({sex: value});
                    }}
                  />
                </View>

                <View style={styles.Text_sign}>
                  <Text style={styles.Text_sign_text}>닉네임</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInput
                      style={styles.Text_sign_input}
                      id="nickname"
                      name="nickname"
                      value={this.state.nickname}
                      onChangeText={(text) =>
                        this.setState({nickname: text, nickname_check: false})
                      }
                    />
                    <TouchableOpacity
                      style={styles.Btn_sign2id}
                      onPress={this.nickNamecheck}>
                      <Text
                        style={{
                          color: 'gray',
                          fontFamily: 'Jalnan',
                          fontSize: 15,
                        }}>
                        중복확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.Text_sign}>
                  <Text style={styles.Text_sign_text}>이메일</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInput
                      style={styles.Text_sign_input2}
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChangeText={(text) =>
                        this.setState({email: text, checked_email: false})
                      }
                    />
                    <Text
                      style={{
                        color: 'gray',
                        fontWeight: 'bold',
                        fontSize: 15,
                        marginRight: 10,
                      }}>
                      @changwon.ac.kr
                    </Text>
                    <TouchableOpacity
                      style={styles.Btn_sign2}
                      onPress={this.sendEmail}>
                      <Text style={{color: 'white', fontFamily: 'Jalnan'}}>
                        전송
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.Text_sign}>
                  <Text style={styles.Text_sign_text}>인증번호</Text>

                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInput
                      style={styles.Text_sign_input2}
                      id="authCheckNum"
                      name="authCheckNum"
                      value={this.state.authCheckNum}
                      secureTextEntry={true}
                      onChangeText={(text) =>
                        this.setState({authCheckNum: text})
                      }
                    />

                    <TouchableOpacity
                      style={styles.Btn_sign2}
                      onPress={this.authEmail}>
                      <Text style={{color: 'white', fontFamily: 'Jalnan'}}>
                        확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.sign_explain}>
                  창원대 이메일으로만 가입이 가능합니다.
                </Text>

                {/* <View>
                  <TouchableOpacity style={styles.Btn_sign} onPress={this.singup2Btn}>
                    <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}}>다음</Text>
                  </TouchableOpacity>
                </View> */}

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
                      다음
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
    backgroundColor: 'white',
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
    marginRight: -20,
    marginTop: -8,
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
export default withNavigation(Sign_up);
