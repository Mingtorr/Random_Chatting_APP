import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import io from 'socket.io-client';
import Mymessage from './mymessage';
import Yourmessage from './yourmessage';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const func = require('../server/api');
const timefunc = require('./timefunction');
const {windowHidth, windowHeight} = Dimensions.get('window');
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';

class Singo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      touserkey: this.props.route.params.touserkey,
      userkey: this.props.route.params.userkey,
      singobody: '',
    };
  }

  componentDidMount() {
    /*
        console.log(this.props.route.params.messages);
        console.log(this.props.route.params.touserkey);
        const data = {
            userkey:this.state.userkey,
            touserkey:this.state.touserkey,
            text:'asdadsasdasd',
            messages:this.props.route.params.messages
        }
        fetch(func.api(3004,'find_touser'), {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }).then();
          */
  }
  singobutton = (e) => {
    console.log(this.props.route.params.touserkey);
    const data = {
      userkey: this.state.userkey,
      touserkey: this.state.touserkey,
      text: this.state.singobody,
      roomid: this.props.route.params.roomid,
    };
    fetch(func.api(3005, 'find_touser'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // alert('신고완료');
    Alert.alert('안내', '신고 완료', [{text: 'OK', style: 'OK'}], {
      cancelable: false,
    });
    this.props.navigation.goBack(null);
  };
  handletxt = (e) => {
    this.setState({
      singobody: e,
    });
    console.log(this.state.singobody);
  };

  backBtn = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <SafeAreaView style={styles.idpw_bg}>
        <TouchableOpacity onPress={this.backBtn}>
          <View style={{marginTop: 20, left: '5%'}}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../Image/cancel.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.idpw_content}>
            <View style={styles.idpw_1}>
              <Text style={styles.Intro_idpw1}>와글 와글</Text>
              <Text style={styles.Intro_idpw2}>신고하기</Text>
            </View>

            <View style={styles.idpw_2}>
              <Text style={styles.Intro_idpw4}>신고내용을 확인하고</Text>
              <Text style={styles.Intro_idpw4}>
                빠른 시일 내에 제재하겠습니다.
              </Text>
            </View>

            <View>
              <Text style={styles.Text_idpw_text}>신고내용</Text>
              <View style={styles.idpw_3}>
                <View style={styles.Text_idpw}>
                  <TextInput
                    placeholder="신고내용을 입력해주세요"
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 15,
                      padding: 10,
                      width: '100%',
                      height: Height * 0.2,
                      paddingTop: 10,
                      marginTop: 20,
                    }}
                    value={this.state.message}
                    onChangeText={this.handletxt}
                    multiline={true}
                    numberOfLines={4}
                    value={this.state.email}
                  />
                </View>
              </View>
            </View>
            <View style={{height: '15%'}}></View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.idpw_5}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#f05052',
              paddingTop: 10,
              paddingBottom: 10,
            }}
            onPress={this.singobutton}>
            <Text style={{color: 'white', fontFamily: 'Jalnan', fontSize: 20}}>
              신고하기
            </Text>
          </TouchableOpacity>
        </View>
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
    height: '88%',
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
    marginBottom: -30,
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
export default Singo;
