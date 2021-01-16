import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Keyboard,
  Alert,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
const func = require('../server/api');

class Find_idpw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      authNum: '', //보낸 인증번호
      authCheckNum: '', // 사용자가 적은 인증번호
      checked_email: false, // 메일 인증 확인
      sendEmailClick: false, //메일 보냄 확인
    };
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

  backBtn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Login');
  };

  sendEmail = (e) => {
    var re = /^[a-zA-Z0-9_]{1,20}$/;
    e.preventDefault();
    if (this.state.email.length === 0) {
      Alert.alert(
        '안내',
        '이메일을 입력해주세요!',
        [{text: 'OK', style: 'OK'}],
        {cancelable: false},
      );
      return;
    } else if (
      !this.check(re, this.state.email, '안내', '잘못된 형식의 이메일입니다.')
    ) {
      return;
    } else {
      this.setState({
        sendEmailClick: true,
      });
      const email = {
        sendEmail: this.state.email,
      };
      fetch(func.api(3001, 'Sendmail2'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(email),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            Alert.alert(
              '안내',
              '인증 메일이 전송되었습니다',
              [{text: 'OK', style: 'OK'}],
              {cancelable: false},
            );
            this.setState({
              authNum: json,
            });
            // console.log(this.state.authNum)
          } else {
            Alert.alert(
              '안내',
              '가입된 이메일이 없습니다',
              [{text: 'OK', style: 'OK'}],
              {cancelable: false},
            );
          }
        });
    }
  };

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

  nextBtn = (e) => {
    e.preventDefault();

    if (!this.state.checked_email) {
      Alert.alert('안내', '메인 인증을 해주세요', [{text: 'OK', style: 'OK'}], {
        cancelable: false,
      });
    } else {
      const find_idpw = {
        email: this.state.email,
      };
      fetch(func.api(3001, 'Find_idpw'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(find_idpw),
      })
        .then((res) => res.json())
        .then((json) => {
          this.props.navigation.navigate('Find_idpw2', {
            user_id: json,
          });
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.idpw_bg}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.idpw_content}>
            <TouchableOpacity onPress={this.backBtn}>
              <View style={{marginTop: 20, left: '5%'}}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../Image/cancel.png')}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.idpw_1}>
              <Text style={styles.Intro_idpw1}>와글 와글</Text>
              <Text style={styles.Intro_idpw2}>ID/PW 찾기</Text>
            </View>

            <View style={styles.idpw_2}>
              <Text style={styles.Intro_idpw4}>
                사용자 이메일을 입력하시면 해당 이메일로
              </Text>
              <Text style={styles.Intro_idpw4}>인증번호를 보내드립니다.</Text>
            </View>

            <View>
              <Text style={styles.Text_idpw_text}>Email</Text>
              <View style={styles.idpw_3}>
                <View style={styles.Text_idpw}>
                  <TextInput
                    style={styles.Text_idpw_input}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
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
                    style={{
                      borderWidth: 0,
                      color: 'white',
                      borderRadius: 60,
                      fontFamily: 'Jalnan',
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingRight: 10,
                      paddingBottom: 5,
                      fontSize: 20,
                      backgroundColor: '#f05052',
                      elevation: 8,
                      marginBottom: 5,
                      marginTop: -4,
                    }}
                    onPress={this.sendEmail}>
                    <Text style={{color: 'white', fontFamily: 'Jalnan'}}>
                      전송
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.Text_idpw_text}>인증번호</Text>
              <View style={styles.idpw_4}>
                <View style={styles.Text_idpw}>
                  <TextInput
                    style={styles.Text_idpw_input}
                    value={this.state.authCheckNum}
                    onChangeText={(text) => this.setState({authCheckNum: text})}
                  />
                  <TouchableOpacity
                    style={{
                      borderWidth: 0,
                      color: 'white',
                      borderRadius: 60,
                      fontFamily: 'Jalnan',
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingRight: 10,
                      paddingBottom: 5,
                      fontSize: 20,
                      backgroundColor: '#f05052',
                      elevation: 8,
                      marginBottom: 5,
                      marginRight: -15,
                      marginTop: -4,
                    }}
                    onPress={this.authEmail}>
                    <Text style={{color: 'white', fontFamily: 'Jalnan'}}>
                      확인
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{height: '15%'}}></View>

            <View style={styles.idpw_5}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#f05052',
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                onPress={this.nextBtn}>
                <Text
                  style={{color: 'white', fontFamily: 'Jalnan', fontSize: 20}}>
                  다음
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  idpw_bg: {
    display: 'flex',
    backgroundColor: 'white',
  },

  idpw_content: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },

  idpw_1: {
    alignItems: 'center',
  },
  idpw_2: {
    marginTop: -10,
    alignItems: 'center',
  },
  idpw_3: {
    alignItems: 'center',
  },
  idpw_4: {
    alignItems: 'center',
  },
  idpw_5: {
    alignItems: 'center',
    marginBottom: 10,
  },

  Intro_idpw1: {
    fontSize: 15,
    color: '#f05052',
    fontFamily: 'Jalnan',
  },
  Intro_idpw2: {
    fontSize: 30,
    color: '#f05052',
    fontFamily: 'Jalnan',
  },
  Intro_idpw4: {
    fontWeight: 'bold',
  },

  Text_idpw: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  Text_idpw_text: {
    fontFamily: 'Jalnan',
    fontSize: 15,
    color: '#f05052',
    marginLeft: 20,
  },

  Text_idpw_input: {
    display: 'flex',
    color: 'black',
    flex: 0.9,
    height: 25,
    fontSize: 20,
    marginLeft: 10,
    padding: 0,
  },

  Btn_confirm1: {},
  Btn_confirm2: {},

  Btn_idpw: {},
});

export default withNavigation(Find_idpw);
