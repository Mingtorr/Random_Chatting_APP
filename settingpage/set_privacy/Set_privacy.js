import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TextInput,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import RNPickerSelect from 'react-native-picker-select';

const func = require('../../server/api');

export default class Set_privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      passwd: '',
      passwd2: '',
      nickname: '',
      key: '',
      sex: '',
      deptno: '',
      major: '',
      checked_id: false,
      checking_passwd: false,
      nickname_check: false,
      realpass: '',
    };
  }
  componentWillMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const UserInfo = JSON.parse(result);
      // console.log('닉네임 : ' + UserInfo.user_nickname);
      this.setState({
        key: UserInfo.user_key,
        nickname: UserInfo.user_nickname,
        sex: UserInfo.user_sex,
        deptno: UserInfo.user_deptno,
        stdno: UserInfo.user_stdno,
      });
      const post = {
        key: UserInfo.user_key,
      };
      fetch(func.api(3001, 'call'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(post),
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            id: json.user_id,
          });
        });
    });
  }
  // 아이디 중복검사
  checkId = (e) => {
    e.preventDefault();
    var re = /^[a-zA-Z0-9]{4,12}$/; //아이디는 4~12자의 영문 대소문자와 숫자로만 입력
    if (
      !this.check(
        re,
        this.state.id,
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
            alert('사용가능한 아이디 입니다.');
            this.setState({
              checked_id: true,
            });
          } else {
            alert('이미 사용중인 아이디 입니다.');
          }
        });
    }
  };
  // 비밀번호 일치 검사
  passwdcheck = (e) => {
    if (this.state.passwd.length === 0 || this.state.passwd2.length === 0) {
      alert('비밀번호를 입력해주세요');
    } else if (this.state.passwd !== this.state.passwd2) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (this.state.passwd === this.state.passwd2) {
      alert('비밀번호가 일치합니다.');
      this.setState({
        checking_passwd: true,
      });
    }
  };
  //닉네임 중복검사
  nickNamecheck = (e) => {
    var re = /^[a-zA-Z0-9가-힣]{2,8}$/;
    if (
      !this.check(
        re,
        this.state.nickname,
        '닉네임은 2~8자의 영문,한글 ,숫자로만 입력가능합니다.',
      )
    ) {
      return;
    } else {
      const Nickname = {
        nickname: this.state.nickname,
      };
      fetch(func.api(3001, 'CheckNickname'), {
        method: 'post',
        header: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(Nickname),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert('사용가능한 닉네임입니다');
            this.setState({
              nickname_check: true,
            });
          } else {
            alert('이미 사용중인 닉네임입니다');
          }
        });
    }
  };
  render() {
    let screenHeight =
      Dimensions.get('window').height - getStatusBarHeight() - getBottomSpace();
    return (
      <SafeAreaView style={styles.Container_privacy}>
        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.Header_privacy}>
                <View style={styles.Head_privacy}>
                  <Text style={styles.Head_setting_privacy}>Setting</Text>
                  <Text>개인정보 변경</Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  height: screenHeight,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <>
                  <View style={styles.Id_privacy}>
                    <Text style={styles.Textid_privacy}>아이디</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <TextInput
                        style={styles.Id_input_privacy}
                        id="id"
                        value={this.state.id}
                        onChangeText={(text) => this.setState({id: text})}
                      />
                      <TouchableOpacity
                        style={styles.Btn_privacy}
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
                  {/* 비번 */}
                  <View style={styles.Id_privacy}>
                    <Text style={styles.Textid_privacy}>비밀번호 변경</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <TextInput
                        style={styles.Id_input_privacy}
                        id="passwd"
                        name="passwd"
                        value={this.state.passwd}
                        onChangeText={(text) => this.setState({passwd: text})}
                      />
                    </View>
                  </View>
                  <View style={styles.Id_privacy}>
                    <Text style={styles.Textid_privacy}>
                      비밀번호 변경 확인
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <TextInput
                        style={styles.Id_input_privacy}
                        id="passwd2"
                        nmae="passwd2"
                        value={this.state.passwd2}
                        onChangeText={(text) => this.setState({passwd2: text})}
                      />
                      <TouchableOpacity
                        style={styles.Btn_privacy}
                        onPress={this.passwdcheck}>
                        <Text
                          style={{
                            color: 'gray',
                            fontFamily: 'Jalnan',
                            fontSize: 15,
                          }}>
                          수정
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* 성별 */}
                  <View style={styles.Sex_privacy}>
                    <Text style={styles.Text_sex_privacy}>성별</Text>
                    {this.state.sex === '0' ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          width: 150,
                        }}>
                        <View style={styles.Circle_privacy} />
                        <Text>남</Text>
                        <View style={styles.Empty_privacy} />
                        <Text>여</Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          width: 150,
                        }}>
                        <View style={styles.Empty_privacy} />
                        <Text>남</Text>
                        <View style={styles.Circle_woman_privacy} />
                        <Text>여</Text>
                      </View>
                    )}
                  </View>
                  {/* 닉네임 */}
                  <View style={styles.Id_privacy}>
                    <Text style={styles.Textid_privacy}>닉네임</Text>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <TextInput
                        style={styles.Id_input_privacy}
                        id="nickname"
                        name="nickname"
                        value={this.state.nickname}
                        onChangeText={(text) => this.setState({nickname: text})}
                      />
                      <TouchableOpacity
                        style={styles.Btn_privacy}
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

                  {/* <View style={styles.Id_privacy}>
                  <Text style={styles.Textid_privacy}>비밀번호 인증</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <TextInput
                      style={styles.Id_input_privacy}
                      id="realpass"
                      value={this.state.realpass}
                      onChangeText={(text) => this.setState({realpass: text})}
                    />
                    <TouchableOpacity
                      style={styles.Btn_privacy}
                      onPress={this.checkId}>
                      <Text
                        style={{
                          color: 'gray',
                          fontFamily: 'Jalnan',
                          fontSize: 15,
                        }}>
                        확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */}

                  {this.state.deptno === '' ? (
                    <View style={styles.Id_privacy}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.Textid_privacy}>학과</Text>
                        <Text style={{marginLeft: 20, fontSize: 10}}>
                          {' '}
                          초기 설정 후 변경이 불가능합니다.
                        </Text>
                      </View>
                      <RNPickerSelect
                        style={{marginBottom: '30', color: 'red'}}
                        placeholder={
                          {
                            // label: '학과선택',
                            // value: null,
                          }
                        }
                        onValueChange={(value) => this.setState({major: value})}
                        items={[
                          {label: '학과를 선택해주세요.', value: 'major1'},
                          {label: '국어국문학과', value: '국어국문학과'},
                          {label: '독어독문학과', value: '독어독문학과'},
                          {label: '일어일문학과', value: '일어일문학과'},
                          {label: '철학과', value: '철학과'},
                          {label: '유아교육과', value: '유아교육과'},
                          {label: '영어영문학과', value: '영어영문학과'},
                          {label: '불어불문학과', value: '불어불문학과'},
                          {label: '사학과', value: '사학과'},
                          {label: '특수교육과', value: '특수교육과'},
                          {label: '법학과', value: '법학과'},
                          {label: '국제관계학과', value: '국제관계학과'},
                          {label: '사회학과', value: '사회학과'},
                          {label: '가족복지학과', value: '가족복지학과'},
                          {label: '행정학과', value: '행정학과'},
                          {label: '중국학과', value: '중국학과'},
                          {label: '신문방송학과', value: '신문방송학과'},
                          {
                            label: '글로벌비즈니스학부',
                            value: '글로벌비즈니스학부',
                          },
                          {label: '경영학과', value: '경영학과'},
                          {label: '세무학과', value: '세무학과'},
                          {label: '국제무역학과', value: '국제무역학과'},
                          {label: '회계학과', value: '회계학과'},
                          {label: '수학과', value: '수학과'},
                          {
                            label: '생물학화학융합학부',
                            value: '생물학화학융합학부',
                          },
                          {label: '생명보건학부', value: '생명보건학부'},
                          {label: '식품영양학과', value: '식품영양학과'},
                          {label: '체육학과', value: '체육학과'},
                          {label: '물리학과', value: '물리학과'},
                          {label: '통계학과', value: '통계학과'},
                          {label: '의류학과', value: '의류학과'},
                          {label: '간호학과', value: '간호학과'},
                          {
                            label: '산업시스템공학과',
                            value: '산업시스템공학과',
                          },
                          {
                            label: '토목환경화공융합공학부',
                            value: '토목환경화공융합공학부',
                          },
                          {
                            label: '화공시스템공학과',
                            value: '화공시스템공학과',
                          },
                          {label: '건축공학부', value: '건축공학부'},
                          {label: '컴퓨터공학과', value: '컴퓨터공학과'},
                          {label: '조선해양공학과', value: '조선해양공학과'},
                          {label: '환경공학과', value: '환경공학과'},
                          {label: '토목공학과', value: '토목공학과'},
                          {label: '건축공학전공', value: '건축공학전공'},
                          {label: '정보통신공학과', value: '정보통신공학과'},
                        ]}
                      />
                    </View>
                  ) : (
                    <View style={styles.Id_privacy}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.Textid_privacy}>학과</Text>
                        <Text style={{marginLeft: 20, fontSize: 10}}>
                          {' '}
                          초기 설정 후 변경이 불가능합니다.
                        </Text>
                      </View>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.Id_input_privacy}>
                          {this.state.deptno}
                        </Text>
                      </View>
                    </View>
                  )}
                </>
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
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Jalnan',
                      fontSize: 20,
                      textAlign: 'center',
                      width: '100%',
                    }}>
                    변경 완료
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
  Container_privacy: {
    display: 'flex',
  },
  Head_setting_privacy: {
    fontSize: 15,
    fontWeight: '600',
  },
  Header_privacy: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  back_privacy: {
    marginLeft: 30,
  },
  Head_privacy: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Id_privacy: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 10,
      },
    }),
  },
  Textid_privacy: {
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
  Id_input_privacy: {
    display: 'flex',
    color: 'black',
    flex: 0.9,
    height: 20,
    fontSize: 15,
    marginLeft: 0,
    padding: 0,
  },
  Btn_privacy: {
    borderWidth: 0,
    color: 'white',
    borderRadius: 60,
    fontFamily: 'Jalnan',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    marginBottom: 5,
    marginRight: -20,
    marginTop: -8,
  },
  Sex_privacy: {
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
  },
  Text_sex_privacy: {
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
  Circle_privacy: {
    backgroundColor: '#2150de',
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  Empty_privacy: {
    backgroundColor: 'white',
    width: 15,
    height: 15,
    borderRadius: 10,
    borderColor: '#20232a',
  },
  Circle_woman_privacy: {
    backgroundColor: '#eb0e54',
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  Text_privacy: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
