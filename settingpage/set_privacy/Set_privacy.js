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
      stdno: '',
      studno: '',
      major: '',

      checking_passwd: false,
      realpass: '',
      email: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const UserInfo = JSON.parse(result);
      // console.log('닉네임 : ' + UserInfo.user_nickname);
      this.setState({
        key: UserInfo.user_key,
        // nickname: UserInfo.user_nickname,
        // sex: UserInfo.user_sex,
        // deptno: UserInfo.user_deptno,
        // stdno: UserInfo.user_stdno,
        email: UserInfo.user_email,
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
            nickname: json.user_nickname,
            sex: json.user_sex,
            deptno: json.user_deptno,
            stdno: json.user_stdno,
          });
        });
    });
    // console.log(this.state.stdno);
  }
  check = (re, what, message) => {
    if (re.test(what)) {
      return true;
    }
    alert(message);
    return false;
  };
  // 아이디 중복검사
  // checkId = (e) => {
  //   e.preventDefault();
  //   var re = /^[a-zA-Z0-9]{4,12}$/; //아이디는 4~12자의 영문 대소문자와 숫자로만 입력
  //   if (
  //     !this.check(
  //       re,
  //       this.state.id,
  //       '아이디는 4~12자의 영문 대소문자와 숫자로만 입력가능합니다.',
  //     )
  //   ) {
  //     return;
  //   } else {
  //     const checkId = {
  //       id: this.state.id,
  //     };
  //     fetch(func.api(3001, 'CheckId'), {
  //       method: 'post',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify(checkId),
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if (json) {
  //           alert('사용가능한 아이디 입니다.');
  //           this.setState({
  //             checked_id: true,
  //           });
  //         } else {
  //           alert('이미 사용중인 아이디 입니다.');
  //         }
  //       });
  //   }
  // };
  // // 아이디 변경
  // changeId = (e) => {
  //   e.preventDefault();
  //   const changeId = {
  //     key: this.state.key,
  //     id: this.state.id,
  //   };
  //   fetch(func.api(3001, 'ChangeId'), {
  //     method: 'post',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(changeId),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json) {
  //         alert('아이디가 변경되었습니다. 다시 로그인해주세요.');
  //         this.setState({
  //           checked_id: false,
  //         });
  //         AsyncStorage.clear();
  //         this.props.navigation.navigate('Login');
  //       } else {
  //         alert('id 변경 실패 버그 신고');
  //       }
  //     });
  // };

  check_changeid = (e) => {
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
      const changeId = {
        key: this.state.key,
        id: this.state.id,
      };
      fetch(func.api(3001, 'ChangeId'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(changeId),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert('아이디가 변경되었습니다. 다시 로그인해주세요.');
            AsyncStorage.clear();
            this.props.navigation.navigate('Login');
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
  //비밀번호 변경
  passchange = (e) => {
    e.preventDefault();
    const changepass = {
      key: this.state.key,
      pass: this.state.passwd,
    };
    fetch(func.api(3001, 'ChangePass'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(changepass),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          alert('비밀번호가 변경되었습니다.');
          this.setState({
            checking_passwd: false,
          });
        } else {
          alert('password 변경 실패 버그 신고');
        }
      });
  };

  nickname_check_change = (e) => {
    var re = /^[a-zA-Z0-9가-힣]{2,8}$/;
    // console.log(this.state.nickname);
    // console.log('남자임');
    if (
      !this.check(
        re,
        this.state.nickname,
        '닉네임은 2~8자의 영문, 한글 ,숫자로만 입력가능합니다.',
      )
    ) {
      return;
    } else {
      const nickname_info = {
        key: this.state.key,
        nickname: this.state.nickname,
      };
      fetch(func.api(3001, 'ChangeNickname'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(nickname_info),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert('닉네임이 변경되었습니다.');
            AsyncStorage.setItem('login_user_info',JSON.stringify({
                user_nickname: this.state.nickname,
              }),
            );
          } else {
            alert('이미 사용중인 닉네임입니다');
          }
        });
    }
  }
  //닉네임 중복검사
  // nickNamecheck = (e) => {
  //   var re = /^[a-zA-Z0-9가-힣]{2,8}$/;
  //   // console.log(this.state.nickname);
  //   // console.log('남자임');
  //   if (
  //     !this.check(
  //       re,
  //       this.state.nickname,
  //       '닉네임은 2~8자의 영문, 한글 ,숫자로만 입력가능합니다.',
  //     )
  //   ) {
  //     return;
  //   } else {
  //     const Nickname = {
  //       nickname: this.state.nickname,
  //     };
  //     fetch(func.api(3001, 'CheckNickname'), {
  //       method: 'post',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //       body: JSON.stringify(Nickname),
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if (json) {
  //           alert('사용가능한 닉네임입니다');
  //           this.setState({
  //             nickname_check: true,
  //           });
  //         } else {
  //           alert('이미 사용중인 닉네임입니다');
  //         }
  //       });
  //   }
  // };
  // //닉네임 바꾸기
  // changenickname = (e) => {
  //   e.preventDefault();
  //   const changenickname = {
  //     key: this.state.key,
  //     nickname: this.state.nickname,
  //   };
  //   fetch(func.api(3001, 'ChangeNickname'), {
  //     method: 'post',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(changenickname),
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json) {
  //         alert('닉네임이 변경되었습니다.');
  //         this.setState({
  //           nickname_check: false,
  //         });
  //       } else {
  //         alert('nickname 변경 실패 버그 신고');
  //       }
  //     });
  //   AsyncStorage.setItem(
  //     'login_user_info',
  //     JSON.stringify({
  //       user_nickname: this.state.nickname,
  //       user_key: this.state.key,
  //       user_id: this.state.id,
  //       user_sex: this.state.sex,
  //       user_email: this.state.email,
  //       user_deptno: this.state.deptno,
  //       user_stdno: this.state.stdno,
  //     }),
  //   );
  // };
  //학과 설정
  setdeptno = (e) => {
    e.preventDefault();
    this.setState({
      deptno: this.state.major,
    });
    // console.log(this.state.major);
    const set_deptno = {
      key: this.state.key,
      deptno: this.state.major,
    };
    fetch(func.api(3001, 'Setdeptno'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(set_deptno),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          alert('학과 설정 완료');
        } else {
          alert('학과 설정 실패 버그 신고 기기기~');
        }
      });
    AsyncStorage.setItem(
      'login_user_info',
      JSON.stringify({
        user_nickname: this.state.nickname,
        user_key: this.state.key,
        user_id: this.state.id,
        user_sex: this.state.sex,
        user_email: this.state.email,
        user_deptno: this.state.deptno,
        user_stdno: this.state.stdno,
      }),
    );
  };
  //학번 설정
  setstdno = (e) => {
    // console.log(this.state.stdno);
    this.setState({
      stdno: this.state.studno,
    });
    e.preventDefault();
    // console.log(this.state.major);
    const set_stdno = {
      key: this.state.key,
      stdno: this.state.studno,
    };
    fetch(func.api(3001, 'Setstdno'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(set_stdno),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          alert('학번 설정 완료');
        } else {
          alert('학번 설정 실패 버그 신고 기기기~');
        }
      });
    AsyncStorage.setItem(
      'login_user_info',
      JSON.stringify({
        user_nickname: this.state.nickname,
        user_key: this.state.key,
        user_id: this.state.id,
        user_sex: this.state.sex,
        user_email: this.state.email,
        user_deptno: this.state.deptno,
        user_stdno: this.state.studno,
      }),
    );
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
                        onChangeText={(text) =>
                          this.setState({id: text})
                        }
                      />
                        <TouchableOpacity
                          style={styles.Btn_privacy}
                          onPress={this.check_changeid}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            변경하기
                          </Text>
                        </TouchableOpacity>

                      {/* {this.state.checked_id === false ? (
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
                      ) : (
                        <TouchableOpacity
                          style={styles.Btn_privacy}
                          onPress={this.changeId}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            변경하기
                          </Text>
                        </TouchableOpacity>
                      )} */}
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
                        secureTextEntry={true}
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
                        secureTextEntry={true}
                        value={this.state.passwd2}
                        onChangeText={(text) => this.setState({passwd2: text})}
                      />
                      {this.state.checking_passwd === false ? (
                        <TouchableOpacity
                          style={styles.Btn_privacy}
                          onPress={this.passwdcheck}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            비밀번호 확인
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.Btn_privacy}
                          onPress={this.passchange}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            비밀번호 변경
                          </Text>
                        </TouchableOpacity>
                      )}
                      {/* <TouchableOpacity
                        style={styles.Btn_privacy}
                        onPress={this.passwdcheck}>
                        <Text
                          style={{
                            color: 'gray',
                            fontFamily: 'Jalnan',
                            fontSize: 15,
                          }}>
                          비밀번호 확인
                        </Text>
                      </TouchableOpacity> */}
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
                          onChangeText={(text) =>
                            this.setState({
                              nickname: text,
                            })
                          }
                        />
                        <TouchableOpacity
                          style={styles.Btn_privacy}
                          onPress={this.nickname_check_change}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            변경하기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                  {/* {this.state.nickname_check === false ? (
                    <View style={styles.Id_privacy}>
                      <Text style={styles.Textid_privacy}>닉네임</Text>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextInput
                          style={styles.Id_input_privacy}
                          id="nickname"
                          name="nickname"
                          value={this.state.nickname}
                          onChangeText={(text) =>
                            this.setState({nickname: text})
                          }
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
                  ) : (
                    <View style={styles.Id_privacy}>
                      <Text style={styles.Textid_privacy}>닉네임</Text>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <TextInput
                          style={styles.Id_input_privacy}
                          id="nickname"
                          name="nickname"
                          value={this.state.nickname}
                          onChangeText={(text) =>
                            this.setState({
                              nickname: text,
                              nickname_check: false,
                            })
                          }
                        />
                        <TouchableOpacity
                          style={styles.Btn_privacy}
                          onPress={this.changenickname}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            변경하기
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )} */}
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
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <RNPickerSelect
                          style={{marginBottom: '30', color: 'red'}}
                          placeholder={
                            {
                              // label: '학과선택',
                              // value: null,
                            }
                          }
                          onValueChange={(value) =>
                            this.setState({major: value})
                          }
                          items={[
                            {label: '학과를 선택해주세요.', value: ''},
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
                        <TouchableOpacity
                          style={styles.Deptno_btn_privacy}
                          onPress={this.setdeptno}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            설정
                          </Text>
                        </TouchableOpacity>
                      </View>
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
                  {this.state.stdno === '' ? (
                    <View style={styles.Id_privacy}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.Textid_privacy}>학번</Text>
                        <Text style={{marginLeft: 20, fontSize: 10}}>
                          {' '}
                          초기 설정 후 변경이 불가능합니다.
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <RNPickerSelect
                          style={{marginBottom: '30', color: 'red'}}
                          placeholder={
                            {
                              // label: '학번 선택',
                              // value: null,
                            }
                          }
                          onValueChange={(value) =>
                            this.setState({studno: value})
                          }
                          items={[
                            {label: '학번을 선택해주세요.', value: ''},
                            {label: '20학번', value: '20'},
                            {label: '19학번', value: '19'},
                            {label: '18학번', value: '18'},
                            {label: '17학번', value: '17'},
                            {label: '16학번', value: '16'},
                            {label: '15학번', value: '15'},
                            {label: '14학번', value: '14'},
                            {label: '13학번', value: '13'},
                            {label: '12학번', value: '12'},
                            {label: '11학번', value: '11'},
                            {label: '10학번', value: '10'},
                            {label: '09학번', value: '09'},
                            {label: '08학번', value: '08'},
                            {label: '08학번', value: '07'},
                            {label: '08학번', value: '06'},
                            {label: '08학번', value: '05'},
                          ]}
                        />
                        <TouchableOpacity
                          style={styles.Deptno_btn_privacy}
                          onPress={this.setstdno}>
                          <Text
                            style={{
                              color: 'gray',
                              fontFamily: 'Jalnan',
                              fontSize: 15,
                            }}>
                            설정
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.Id_privacy}>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.Textid_privacy}>학번</Text>
                        <Text style={{marginLeft: 20, fontSize: 10}}>
                          {' '}
                          초기 설정 후 변경이 불가능합니다.
                        </Text>
                      </View>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text style={styles.Id_input_privacy}>
                          {this.state.stdno}
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
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Main');
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
    backgroundColor:'white'
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
  Deptno_btn_privacy: {
    borderWidth: 0,
    color: 'white',
    borderRadius: 60,
    fontFamily: 'Jalnan',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    marginBottom: 5,
    marginTop: -8,
    marginRight: 20,
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
