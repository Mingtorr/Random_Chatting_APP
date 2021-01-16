import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import messaging from '@react-native-firebase/messaging';
const func = require('../server/api');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: '',
      pass: '',
    };
  }
  handleName = (e) => {
    this.setState({
      name1: e,
    });
    // console.log(this.state.name1);
  };
  handleName2 = (e) => {
    this.setState({
      pass: e,
    });
    // console.log(this.state.pass);
  };

  onlogin = async (e) => {
    console.log('asdf');
    const token = await messaging().getToken();
    const post = {
      id: this.state.name1,
      passwd: this.state.pass,
      token: token,
    };
    fetch(func.api(3001, 'login'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(JSON.stringify(json)+"시발");
        if (json) {
          AsyncStorage.setItem('login_onoff_set', 'true', () => {
            AsyncStorage.setItem(
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
              () => {
                this.props.navigation.navigate('Main');
              },
            );
          });
        } else {
          alert('아이디 또는 비밀번호 틀림');
        }
      });
  };

  singupBtn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Signup');
  };

  find_idpwBtn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Find_idpw');
  };

  render() {
    let screenHeight =
      Dimensions.get('window').height - getStatusBarHeight() - getBottomSpace();
    return (
      <SafeAreaView style={styles.White_login}>
        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: screenHeight,
              }}>
              <View style={styles.bg1}>
                <View style={styles.Textbox_login2}>
                  <Text style={styles.Intro_login}>창원대 매칭앱</Text>
                </View>
                <View style={styles.Textbox_login}>
                  <Text style={styles.Intro_login2}>와글와글</Text>
                </View>
              </View>

              <View style={styles.Swiper_bg}>
                <Swiper
                  style={styles.wrapper}
                  autoplay={true}
                  autoplayTimeout={3}
                  showsPagination={false}
                  activeDot={
                    <View
                      style={{
                        backgroundColor: '#f05052',
                        width: 9,
                        height: 9,
                        borderRadius: 7,
                        marginLeft: 7,
                        marginRight: 7,
                      }}
                    />
                  }>
                  <View style={styles.slide1}>
                    <Text style={styles.swiper_text}>
                      '다른 학과' 사람들과 친해질수 있는
                    </Text>
                    <Text style={styles.swiper_text}>최고의 방법</Text>
                    <Image
                      style={{height:'100%',width:'100%'}}
                      source={require('./swiper1.png')}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.slide2}>
                    <Text style={styles.swiper_text}>학교사람들과 친해지고 싶다면?</Text>
                    <Text style={styles.swiper_text}>와글와글로 와!</Text>
                    <Image
                      style={{height:'100%',width:'100%'}}
                      source={require('./swiper2.png')}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.slide3}>
                    <Text style={styles.swiper_text}>내 손 안에 작은 학교</Text>
                    <Text style={styles.swiper_text}>와글와글</Text>
                    <Image
                       style={{height:'100%',width:'100%'}}
                      source={require('./swiper3.png')}
                      resizeMode="cover"
                    />
                  </View>
                </Swiper>
              </View>

              <View style={styles.bg2}>
                <View style={styles.Text_login}>
                  <Text style={styles.Text_login_text}>아이디</Text>
                  <TextInput
                    style={styles.Text_login_input}
                    id="name"
                    value={this.state.name1}
                    onChangeText={this.handleName}
                  />
                </View>
                <View style={styles.Text_login}>
                  <Text style={styles.Text_login_text}>비밀번호</Text>
                  <TextInput
                    style={styles.Text_login_input2}
                    id="pass"
                    name="pass"
                    value={this.state.pass}
                    secureTextEntry={true}
                    onChangeText={this.handleName2}
                  />
                </View>
              </View>

              <View style={styles.bg3}>
                <View style={styles.login_button_view}>
                  <TouchableOpacity
                    style={{marginRight: 70}}
                    onPress={this.singupBtn}>
                    <Text style={{fontSize: 15, fontFamily: 'Jalnan'}}>
                      처음이신가요?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={this.find_idpwBtn}>
                    <Text style={{fontSize: 15, fontFamily: 'Jalnan'}}>
                      ID/PW 찾기
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{width: '100%'}}>
                <TouchableOpacity
                  style={styles.Btn_login}
                  onPress={this.onlogin}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Jalnan',
                      fontSize: 20,
                    }}>
                    로그인
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  login_button_view: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  White_login: {
    display: 'flex',
    // alignItems: 'center',
    flex: 1,
    //backgroundColor:"#c7d9ff"
    backgroundColor: 'white',
    // justifyContent: 'space-between',
  },
  Textbox_login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  Swiper_bg: {
    display: 'flex',
    marginTop: 20,
    height: '45%',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
  },
  swiper_image: {},
  swiper_text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  Textbox_login2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  Intro_login: {
    marginTop: 0,
    fontSize: 15,
    color: '#f05052',
    fontFamily: 'Jalnan',
    marginBottom: 3,
  },
  Intro_login2: {
    marginTop: 0,
    fontSize: 30,
    color: '#f05052',
    fontFamily: 'Jalnan',
  },
  Text_login: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  Text_login_text: {
    fontFamily: 'Jalnan',
    fontSize: 15,
    color: '#f05052',
  },
  Text_login_input: {
    display: 'flex',
    color: 'black',
    flex: 0.9,
    height: 20,
    fontSize: 15,
    marginLeft: 20,
    padding: 0,
  },
  Text_login_input2: {
    display: 'flex',
    color: 'black',
    flex: 0.9,
    height: 20,
    fontSize: 15,
    marginLeft: 10,
    padding: 0,
  },
  Btn_login: {
    borderWidth: 0,
    marginTop: 20,
    color: 'white',
    fontFamily: 'Jalnan',
    alignItems: 'center',
    paddingLeft: 30,
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#f05052',
    elevation: 8,
    marginBottom: 10,
  },
});
export default withNavigation(Login);
