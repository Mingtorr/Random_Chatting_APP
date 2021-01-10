import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Keyboard,
  Text,
  Animated,
  TouchableOpacity,
  Button,
  Switch,
} from 'react-native';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  AdEventType,
  RewardedAdEventType,
  BannerAdSize,
} from '@react-native-firebase/admob';
import Solo_match from './solomatch';
import Group_match from './groupmatch';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-community/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// import { Dimensions } from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const func = require('../server/api');

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-5434797501405557/2267266613';

const unitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-5434797501405557/2267266613'
    : 'ca-app-pub-5434797501405557/4414384979';

let animatedValue =
  Platform.OS === 'ios' ? chartHeight * 0.16 : chartHeight * 0.12;

export default class match_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // animatedValue: new Animated.Value(140),
      // animatedValue: new Animated.Value(chartHeight * 0.12),
      // animatedValue: chartHeight * 0.12,
      buttonColor1: '#E94e68',
      buttonColor2: 'gray',
      chatting: '채팅권 추가',
      title: '내 채팅권 개수',
      isEnabled: false,
      div: <Solo_match resetHeart={this.resetHeart}/>,
      shadowTF: 'none',
      CircleTF: 'off',
      Heart: 5,
      userkey: '',
      myname: '',
      shadowDisplay: true,
    };
    console.log('가로', chartHeight);
    console.log('세로', chartWidth);
  }
  componentDidMount = async () => {
    let box;

    await AsyncStorage.getItem('login_user_info', (err, result) => {
      //user정보가져오기
      this.setState({
        userkey: JSON.parse(result).user_key,
        myname: JSON.parse(result).user_nickname,
      });

      box = {
        userkey: JSON.parse(result).user_key,
        myname: JSON.parse(result).user_nickname,
      };
    });

    console.log(box);

    fetch(func.api(3003, 'Heart_number'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(box),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log('하트불러오기',json);
        this.setState({
          Heart: json.user_heart,
        });
      });
  };

  resetHeart=(number)=>{
    this.setState({
      Heart:number,
    })
  }

  startAdmob = async () => {
    this.setState({
      CircleTF: 'on',
    });

    let box;

    const rewardAd = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    let rewardlListener = rewardAd.onAdEvent(async (type, error, reward) => {
      if (error) {
        console.log('동영상을 불러오는 중 오류가 발생했어요', error);
      }
      if (type === RewardedAdEventType.LOADED) {
        rewardAd.show();
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        //광고 보고 난 후
        // alert('충전 완료');
        this.setState({
          CircleTF: 'off', //프로그래스 끄기
        });

        await AsyncStorage.getItem('login_user_info', (err, result) => {
          //user정보가져오기
          this.setState({
            userkey: JSON.parse(result).user_key,
            myname: JSON.parse(result).user_nickname,
            Heart: 5,
          });

          box = {
            userkey: JSON.parse(result).user_key,
            myname: JSON.parse(result).user_nickname,
          };
        });
        console.log(box);

        await fetch(func.api(3003, 'Heart_reset'), {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(box),
        });
      }
    });
    rewardAd.load();

    return () => {
      rewardlListener = null;
    };
  };

  shadow = () => {
    if (this.state.shadowTF == 'none') {
      this.setState({
        shadowTF: 'flex',
      });
    } else {
      this.setState({
        shadowTF: 'none',
      });
    }
  };
  shadowSwitch = () => {
    console.log('스위치', this.state.shadowDisplay);
    this.setState({
      shadowDisplay: !this.state.shadowDisplay,
    });
  };

  toggleSwitch = () => {
    if (this.state.isEnabled === true) {
      this.setState({
        isEnabled: false,
      });
    } else {
      this.setState({
        isEnabled: true,
      });
    }
  };
  startAnimationL = () => {
    this.setState({
      chatting: '채팅권 추가',
      buttonColor1: '#E94e68',
      buttonColor2: 'gray',
      title: '내 채팅권 개수',
      change: '일반채팅',
      div: <Solo_match resetHeart={this.resetHeart}/>,
    });
    // Animated.timing(this.state.animatedValue, {
    //   duration: 1000,
    //   // toValue: 140,
    //   toValue: chartHeight * 0.12,
    //   useNativeDriver: false,
    // }).start();
  };
  startAnimationR = () => {
    this.setState({
      chatting: '과팅권 추가',
      buttonColor1: 'gray',
      buttonColor2: '#E94e68',
      title: '내 채팅방권 개수',
      change: '오픈채팅',
      div: (
        <Group_match shadow={this.shadow} shadowSwitch={this.shadowSwitch} />
      ),
      // shadowDisplay: !this.state.shadowDisplay
    });
    // Animated.timing(this.state.animatedValue, {
    //   duration: 1000,
    //   // toValue: 56,
    //   toValue: chartHeight * 0,
    //   useNativeDriver: false,
    // }).start();
  };
  render() {
    const windowWidth = Dimensions.get('window').width;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            height: chartHeight * 0.185,
            // flex: 0.8,
            width: chartWidth * 0.9,
            top: animatedValue,
            // top: '10%',
            left: '5%',
            zIndex: 1,
            borderRadius: 15,
            shadowColor: '#000000',
            shadowOpacity: 0.6,
            shadowOffset: {width: 1, height: 1},
            elevation: 3,
            // backgroundColor: 'balck',
            // opacity: 0.2,
          }}>
          {this.state.CircleTF == 'on' ? (
            <Progress.Circle
              size={70}
              indeterminate={true}
              position={'absolute'}
              left={'41%'}
              top={chartHeight * 0.25}
              color={'red'}
            />
          ) : (
            <View></View>
          )}
          {this.state.shadowDisplay ? (
            <View />
          ) : (
            <View
              style={{
                position: 'absolute',
                display: this.state.shadowTF,
                flexDirection: 'column',
                backgroundColor: 'black',
                opacity: 0.5,
                height: chartHeight * 0.185,
                width: chartWidth * 0.9,
                // top: this.state.animatedValue,
                // left: '5%',
                zIndex: 1,
                borderRadius: 15,
                // shadowColor: '#000000',
                // shadowOpacity: 0.6,
                // shadowOffset: {width: 2, height: 2},
                elevation: 3,
                // backgroundColor: 'balck',
                // opacity: 0.2,
              }}></View>
          )}

          <View
            style={{
              display: 'flex',
              flex: 0.45,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: 3}}></View>
            <View style={{marginBottom: 10, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={this.startAnimationL}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    // fontSize: 15,
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    color: this.state.buttonColor1,
                  }}>
                  일반채팅
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 10, justifyContent: 'center'}}>
              <Text style={{fontSize: 20, color: 'gray'}}>|</Text>
            </View>
            <View style={{marginBottom: 10, justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={this.startAnimationR}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    color: this.state.buttonColor2,
                  }}>
                  오픈채팅
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: 3}}></View>
          </View>

          <View style={{display: 'flex', flex: 0.35, flexDirection: 'row'}}>
            <View style={{display: 'flex', flex: 0.12}}></View>
            <View
              style={{display: 'flex', flex: 0.6, justifyContent: 'center'}}>
              <Text
                adjustsFontSizeToFit
                style={{
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: 'bold',
                  fontFamily: 'Jalnan',
                }}>
                {this.state.title}
              </Text>
              <View style={{marginTop: chartHeight * 0.01}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: 'bold',
                  }}>
                  하루에 5개씩 지급됩니다!
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flex: 0.28,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: 'bold',
                  fontFamily: 'Jalnan',
                }}>
                {this.state.Heart}/5
              </Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flex: 0.45,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            {/* <View style={{flex:0.55,justifyContent:'center',marginLeft:50,flexDirection:'row'}}> */}
            <TouchableOpacity onPress={this.startAdmob}>
              <LinearGradient
                // onPress={this.startAnimationL}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#E94e68', '#eb6c63']}
                style={styles.linearGradient}
                style={{
                  // width: 110,
                  width: chartWidth * 0.23,
                  height: chartHeight * 0.055,
                  backgroundColor: '#E94e68',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  adjustsFontSizeToFit
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    fontFamily: 'Jalnan',
                    color: 'white',
                  }}>
                  {this.state.chatting}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            backgroundColor: 'white',
            flex: 1,
            flexDirection: 'column',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E94e68', '#eb6c63']}
            style={styles.linearGradient}
            style={{display: 'flex', backgroundColor: 'red', flex: 0.2}}>
            <View style={{display: 'flex', flex: 0.1}}>{/* 채우기용 */}</View>
            <View style={{display: 'flex', flex: 0.4, flexDirection: 'row'}}>
              <View style={{display: 'flex', flex: 0.05}}></View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: windowWidth,
                }}>
                <View style={{width: windowWidth}}>
                  <Text style={{height: chartHeight * 0.03}}></Text>
                  <Text
                    adjustsFontSizeToFit
                    style={{
                      fontSize: responsiveFontSize(3.8),
                      fontFamily: 'Jalnan',
                      fontWeight: '900',
                      color: 'white',
                      textAlign: 'center',
                      display: 'flex',
                    }}>
                    일반채팅
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      color: 'white',
                      textAlign: 'center',
                      // marginTop: '1%',
                      marginTop: chartHeight * 0.01,
                    }}>
                    !부적절한 대화나 혐오성 발언은 제재 대상이 될 수 있습니다.
                  </Text>
                </View>
              </View>

              <View
                style={{display: 'flex', flex: 0.7, justifyContent: 'center'}}>
                {/* fontSize:25,fontFamily:"Jalnan",fontWeight:'900',color:'white',textAlign:'center' */}
                {/* <Text style={{fontSize:16,fontFamily:"Jalnan",fontWeight:'bold',color:'white',paddingBottom:4}}>부적절한 대화나 혐오성 발언은</Text>
                      <Text style={{fontSize:16,fontFamily:"Jalnan",fontWeight:'bold',color:'white'}}>제재 대상이 될 수 있습니다.</Text> */}
              </View>
            </View>
            {/* <View style={{display:'flex',flex:0.05,backgroundColor:'black'}}>
            
                  </View> */}
          </LinearGradient>
          <View style={{display: 'flex', flex: 0.8}}>{this.state.div}</View>
        </View>
      </SafeAreaView>
    );
  }
}
const Tab = createMaterialTopTabNavigator();

function Match_tab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
        style: {backgroundColor: 'white', color: 'red'},
        indicatorStyle: {backgroundColor: 'red'},
        labelStyle: {fontSize: 15, fontFamily: 'Jalnan'},
      }}>
      <Tab.Screen name="오픈채팅" component={A1} />
      <Tab.Screen name="일반채팅" component={A1} />
    </Tab.Navigator>
  );
}
function A1() {
  return (
    <View style={{backgroundColor: 'white', display: 'flex', flex: 1}}></View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
