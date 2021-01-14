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
  Alert
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
const func = require('../server/api');

class Find_idpw2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pw1: '',
      pw2: '',
    };
  }

  changeBtn = (e) => {
    if (this.state.pw1.length === 0 || this.state.pw2.length === 0) {
      Alert.alert(
        "안내",
        "비밀번호를 입력해주세요",
        [{text: "OK", style: "OK"}],
        { cancelable: false }
      );
    } else if (this.state.pw1 !== this.state.pw2) {
      Alert.alert(
        "안내",
        "비밀번호가 일치하지 않습니다",
        [{text: "OK", style: "OK"}],
        { cancelable: false }
      );
    } else if (this.state.pw1 === this.state.pw2) {
      const user_info = {
        user_id: this.props.route.params.user_id,
        user_pw: this.state.pw1,
      };

      fetch(func.api(3001, 'Find_idpw2'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user_info),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json === true) {
            this.props.navigation.navigate('Login');
          } else {
            Alert.alert(
              "안내",
              "비밀번호 수정 실패",
              [{text: "OK", style: "OK"}],
              { cancelable: false }
            );
          }
        });
    }
  };

  backBtn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Find_idpw');
  };

  render() {
    return (
      <SafeAreaView style={styles.idpw2_bg}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.idpw2_content}>
            <TouchableOpacity onPress={this.backBtn}>
              <View style={{marginTop: 20, left: '5%'}}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('./cancel.png')}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.idpw2_1}>
              <Text style={styles.Intro_idpw1}>와글 와글</Text>
              <Text style={styles.Intro_idpw2}>ID/PW 찾기</Text>
            </View>

            <View>
              <Text style={styles.Text_idpw_text}>비밀번호</Text>
              <View style={styles.idpw2_2}>
                <View style={styles.Text_idpw}>
                  <TextInput
                    style={styles.Text_idpw_input}
                    value={this.state.pw1}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({pw1: text})}
                  />
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.Text_idpw_text}>비밀번호 확인</Text>
              <View style={styles.idpw2_3}>
                <View style={styles.Text_idpw}>
                  <TextInput
                    style={styles.Text_idpw_input}
                    value={this.state.pw2}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({pw2: text})}
                  />
                </View>
              </View>
            </View>
            <View style={{height: '20%'}}></View>

            <View style={styles.idpw2_4}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#f05052',
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
                onPress={this.changeBtn}>
                <Text
                  style={{color: 'white', fontFamily: 'Jalnan', fontSize: 20}}>
                  변경
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
  idpw2_bg: {
    display: 'flex',
    backgroundColor: 'white',
  },

  idpw2_content: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  idpw2_1: {
    alignItems: 'center',
  },
  idpw2_2: {
    alignItems: 'center',
  },
  idpw2_3: {
    alignItems: 'center',
  },
  idpw2_4: {
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

  Btn_idpw: {},
});

export default withNavigation(Find_idpw2);
