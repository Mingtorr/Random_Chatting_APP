import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import {Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
const func = require('../server/api');

class Sign_up2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      major: '',
      studno: '',
    };
  }

  onSubmit = (e) => {
    const post = {
      major: this.state.major,
      studno: this.state.studno,
      user_id: this.props.route.params.user_id,
    };

    fetch(func.api(3001, 'Signup2'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === true) {
          this.props.navigation.navigate('Login');
        } else {
          alert('회원가입 실패');
        }
      });
  };

  backBtn = (e) => {
    e.preventDefault();
    const user_id = {
      user_id: this.props.route.params.user_id,
    };

    fetch(func.api(3001, 'Signup_Delete'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user_id),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === true) {
          this.props.navigation.navigate('Signup');
        } else {
          console.log('back_err');
        }
      });
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
        <KeyboardAwareScrollView>
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
                onPress={this.backBtn}>
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
                  <Text style={styles.Intro_sign2}>학과/학번</Text>
                </View>
              </View>

              <View style={styles.Text_sign}>
                <Text
                  style={{
                    fontFamily: 'Jalnan',
                    fontSize: 15,
                    color: '#f05052',
                    marginRight: 80,
                    marginBottom: 20,
                  }}>
                  학과
                </Text>
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
                    {label: '글로벌비즈니스학부', value: '글로벌비즈니스학부'},
                    {label: '경영학과', value: '경영학과'},
                    {label: '세무학과', value: '세무학과'},
                    {label: '국제무역학과', value: '국제무역학과'},
                    {label: '회계학과', value: '회계학과'},
                    {label: '수학과', value: '수학과'},
                    {label: '생물학화학융합학부', value: '생물학화학융합학부'},
                    {label: '생명보건학부', value: '생명보건학부'},
                    {label: '식품영양학과', value: '식품영양학과'},
                    {label: '체육학과', value: '체육학과'},
                    {label: '물리학과', value: '물리학과'},
                    {label: '통계학과', value: '통계학과'},
                    {label: '의류학과', value: '의류학과'},
                    {label: '간호학과', value: '간호학과'},
                    {label: '산업시스템공학과', value: '산업시스템공학과'},
                    {
                      label: '토목환경화공융합공학부',
                      value: '토목환경화공융합공학부',
                    },
                    {label: '화공시스템공학과', value: '화공시스템공학과'},
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

              <View style={styles.Text_sign}>
                <Text style={styles.Text_sign_text}>학번</Text>
                {/* <View style={{height:20}}>
              <TextInput style={styles.Text_sign_input2}  id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
              </View> */}
                <RNPickerSelect
                  style={{marginBottom: '30', color: 'red'}}
                  placeholder={
                    {
                      // label: '학번 선택',
                      // value: null,
                    }
                  }
                  onValueChange={(value) => this.setState({studno: value})}
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
                    {label: '07학번', value: '07'},
                    {label: '06학번', value: '06'},
                    {label: '05학번', value: '05'},
                  ]}
                />
              </View>

              <Text style={styles.sign_explain}>
                ! 필수항목이 아니며 일부 기능이 제한 될 수 있습니다.
              </Text>

              <View style={{height: '25%'}}></View>
              {/* 빈공간 채우기용 */}
              <View>
                <TouchableOpacity
                  style={styles.bar_Btn_sign}
                  onPress={this.onSubmit}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Jalnan',
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    완료
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    backgroundColor: 'white',
  },
  Container_sign: {
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 60,

    ...Platform.select({
      ios: {
        width: '95%',
      },
      android: {
        width: '100%',
      },
    }),
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
    // marginTop:15,
    marginTop: 50,
    marginBottom: 10,
  },
  Intro_sign: {
    marginTop: 0,
    fontSize: 15,
    color: '#f05052',
    fontFamily: 'Jalnan',
    marginBottom: 5,
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
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  Text_sign_text: {
    fontFamily: 'Jalnan',
    fontSize: 15,
    color: '#f05052',
    marginBottom: 15,
    // marginRight:80,
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

  sign_explain: {
    // marginTop:15,
  },
  bar_Btn_sign: {
    // borderWidth:0,
    marginTop: 25,
    color: 'white',
    // borderRadius:60,
    fontFamily: 'Jalnan',
    paddingLeft: 30,
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#f05052',
    // elevation:8,
    marginBottom: 10,
    width: 1000,
    // textAlign: 'center',
  },
});
export default withNavigation(Sign_up2);
