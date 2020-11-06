/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity ,
  Button,
  TextInput,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBottomSpace } from "react-native-iphone-x-helper";


 class Sign_up extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id: "",
      pw: "",
      pw2:"",
      major: "",
      hnumber:"",
      email:"",
      injung: "",
      sex:"",
      selectmajor:"학과 선택",
      trueID: "사용 가능한 ID입니다.",
      falseID: "다시 입력 해 주세요",
      trueNick: "사용 가능한 닉네임입니다.",
      falseNick: "이미 사용중인 닉네임입니다.",
      trueEmail: "확인 됐습니다.",
      falseEmail: "틀렸습니다. 다시 입력해주세요",
    }
  }



  handleName = (e) => {
    this.setState({
      id: e,
    });
    console.log(this.state.id);
  };
  handleName2 = (e) => {
    this.setState({
      pw: e,
    });
    console.log(this.state.pw);
  };
  
  onclick=(e)=>{
    const post = {
      name: this.state.name1,
      pass: this.state.pass,
    };
    fetch("http://192.168.200.193:3001/api/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.boolean === false) {
         alert("아이디 비밀번호 틀림")
        } else {
          alert("로그인 성공")
        }
      });
  }
  singup2Btn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Signup2')
  };

  Alert_id = () =>
     Alert.alert(                    // 말그대로 Alert를 띄운다
      "ID 중복확인",                    // 첫번째 text: 타이틀 제목
      this.state.trueID,                         // 두번째 text: 그 밑에 작은 제목
      [                              // 버튼 배열
        // {
        //   text: "아니요",                              // 버튼 제목
        //   onPress: () => console.log("아니라는데"),     //onPress 이벤트시 콘솔창에 로그를 찍는다
        //   style: "cancel"
        // },
        { text: "확인", onPress: () => console.log("그렇다는데") }, //버튼 제목
                                                               // 이벤트 발생시 로그를 찍는다
      ],
      { cancelable: false }
    );

    Alert_nick = () =>
     Alert.alert(                    // 말그대로 Alert를 띄운다
      "중복확인",                    // 첫번째 text: 타이틀 제목
      this.state.trueNick,                         // 두번째 text: 그 밑에 작은 제목
      [                              // 버튼 배열
        { text: "확인", onPress: () => console.log("그렇다는데") }, //버튼 제목
                                                               // 이벤트 발생시 로그를 찍는다
      ],
      { cancelable: false }
    );

    Alert_email = () =>
     Alert.alert(                    // 말그대로 Alert를 띄운다
      "인증번호가 전송 되었습니다.",                    // 첫번째 text: 타이틀 제목
      // this.state.trueNick,                         // 두번째 text: 그 밑에 작은 제목
      [                              // 버튼 배열
        { text: "확인", onPress: () => console.log("그렇다는데") }, //버튼 제목
                                                               // 이벤트 발생시 로그를 찍는다
      ],
      { cancelable: false }
    );

    Alert_injung = () =>
    Alert.alert(                    // 말그대로 Alert를 띄운다
                        // 첫번째 text: 타이틀 제목
     this.state.trueEmail,                         // 두번째 text: 그 밑에 작은 제목
     [                              // 버튼 배열
       { text: "확인", onPress: () => console.log("그렇다는데") }, //버튼 제목
                                                              // 이벤트 발생시 로그를 찍는다
     ],
     { cancelable: false }
   );

  render(){
    let radio_props = [     //radio button
      {label: '남    ', value: 0 },
      {label: '여', value: 1 }
    ];

    let screenHeight = Dimensions.get('window').height - getStatusBarHeight()- getBottomSpace();

    
    return(
      <SafeAreaView style={{backgroundColor:'white', flex:1, backgroundColor:'white'}}>
      <KeyboardAwareScrollView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.Container_sign2}
    >
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         
      <View 
      // style={styles.White_sign}
      style={{display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      backgroundColor:"white", //dadfa
      height:screenHeight}}
      >
     

     
     
        <View style={styles.Container_sign}>

        <TouchableOpacity style={{marginTop:10, position:'absolute', left:'5%'}} onPress={() => this.props.navigation.goBack()}>
        <Image 
          style={{width:25, height:25}}
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
            <View style={{display:"flex", flexDirection:"row"}}>
              <TextInput style={styles.Text_sign_input} id="id"
                value={this.state.id}
                onChangeText={this.handleName}
                />
              {/* <TouchableOpacity style={{padding:-30}} onPress={this.singupBtn}>
                  <Text style={styles.sign_button}>중복확인</Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={styles.Btn_sign2id} onPress={this.Alert_id}>
                    <Text style={{color:'gray',fontFamily:'Jalnan',fontSize:15}}>중복확인</Text>
            </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>비밀번호</Text>
            <View style={{height:20}}>
            <TextInput style={styles.Text_sign_input2}   id="pw"
              name="pw"
              value={this.state.pw}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
              </View>
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>비밀번호 확인</Text>
            <View style={{height:20}}>
            <TextInput style={styles.Text_sign_input2}   id="sex"
              name="sex"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
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
                onPress={(value) => {this.setState({value:value})}}
             />
           
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>닉네임</Text>
            <View style={{display:"flex", flexDirection:"row"}}>
            <TextInput style={styles.Text_sign_input}   id="pw"
              name="pw"
              value={this.state.pw}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
              <TouchableOpacity style={styles.Btn_sign2id} onPress={this.Alert_nick}>
                    <Text style={{color:'gray',fontFamily:'Jalnan',fontSize:15}}>중복확인</Text>
            </TouchableOpacity>
              </View>
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>이메일</Text>
            <View style={{display:"flex", flexDirection:"row"}}>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
           

            <TouchableOpacity style={styles.Btn_sign2} onPress={this.Alert_email}>
              <Text style={{color:'white',fontFamily:'Jalnan'}}>전송</Text>
            </TouchableOpacity>
            </View>
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>인증번호</Text>

            <View style={{display:"flex", flexDirection:"row"}}>

              <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>

               <TouchableOpacity style={styles.Btn_sign2} onPress={this.Alert_injung}>
               <Text style={{color:'white',fontFamily:'Jalnan'}}>확인</Text>
               </TouchableOpacity>

            </View>

          </View>

          <Text style={styles.sign_explain}>창원대 이메일으로만 가입이 가능합니다.</Text>

          {/* <View>
            <TouchableOpacity style={styles.Btn_sign} onPress={this.singup2Btn}>
              <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}}>다음</Text>
            </TouchableOpacity>
          </View> */}

          <View>
            <TouchableOpacity style={styles.bar_Btn_sign} onPress={this.singup2Btn}>
              <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20,textAlign:'center',width:'100%'}}>다음</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      
     
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
     </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  login_button_view:{
    display:"flex",
    flexDirection:"row",
    marginBottom:20,
    marginTop:20
  },
  White_sign:{
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",

    flex:1,
    backgroundColor:"white", //dadfa
    // height:'100%'

  },
  Container_sign:{
    display:"flex",
    flexDirection:"column",
    alignContent: "center",//추가된거
    // justifyContent:"space-evenly",
    justifyContent:"space-between",

    alignItems:"center",
    backgroundColor:"white",
    width:'95%',
    height:'100%',
    // borderRadius:60,
    
  },
  Container_sign2:{
    display:"flex",
    flexDirection:"column",
    // flex:1,
    // borderRadius:60,
    // height:'100%'
  },
  Textbox_sign:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
   
   
  },  Textbox_sign2:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    // marginTop:30
   
  },
  Intro_sign:{
    marginTop:0,
    fontSize:15,
    color:"#f05052",
    fontFamily:"Jalnan",
    marginTop:20,
    marginBottom:10
  },
  Intro_sign2:{
    marginTop:0,
    fontSize:30,
    // color:"#4f87ba",
    color:"#f05052",
    fontFamily:"Jalnan"
  },
  Text_sign:{
    display:"flex",
    flexDirection:'column',
    width:'90%',
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  Text_sign_black:{
    display:"flex",
    flexDirection:'row',
    width:'80%',
    marginTop:15,
  },
  Text_sign_sex:{
    display:"flex",
    flexDirection:'row',
    justifyContent: 'space-around',
    width:'90%',
    marginTop:15,

    // borderBottomWidth:1,
    // borderBottomColor:'gray'
  },
  
  Text_sign_text:{
    fontFamily:'Jalnan',
    fontSize:15,
    color:'#f05052',
    marginBottom:15
    // marginRight:80,
  },
  Text_sign_text_sex:{
    fontFamily:'Jalnan',
    fontSize:15,
    color:'#f05052',
    marginRight:60,
  },
  Text_sign_input:{
    display:"flex",
    color:'black',
    flex:0.9,
    height:20,
    fontSize:15,
    marginLeft:0,
    padding:0
    
  },Text_sign_input2:{
    display:"flex",
    color:'black',
    flex:0.9,
    height:20,
    fontSize:15,
    marginLeft:0,
    padding:0
  },
  Btn_sign:{
    borderWidth:0,
    marginTop:25,
    color:'white',
    borderRadius:60,
    fontFamily:'Jalnan',
    paddingLeft:30,
    paddingTop:3,
    paddingRight:30,
    paddingBottom:3,
    fontSize:20,
    backgroundColor:'#f05052',
    elevation:8,
    marginBottom:10
  },
  Btn_sign2id:{
    borderWidth:0,
    // marginTop:25,
    color:'white',
    borderRadius:60,
    fontFamily:'Jalnan',
    paddingLeft:10,
    paddingTop:5,
    // paddingRight:10,
    paddingBottom:5,
    fontSize:20,
    // backgroundColor:'#f05052',
    
    elevation:8,
    marginBottom:5,
    marginRight:-20,
    marginTop:-4,
  },

  Btn_sign2:{
    borderWidth:0,
    // marginTop:25,
    color:'white',
    borderRadius:60,
    fontFamily:'Jalnan',
    paddingLeft:10,
    paddingTop:5,
    paddingRight:10,
    paddingBottom:5,
    fontSize:20,
    backgroundColor:'#f05052',
    
    elevation:8,
    marginBottom:5,
    marginRight:-15,
    marginTop:-4,
  },
  
  sign_explain:{
      marginTop:15,
  },
  sign_button:{
    fontSize:15,
    fontFamily:'Jalnan',
    color:"gray",
    marginRight:-15,
    // marginBottom:-30,
    paddingBottom:-30,
  },
  sel_placeholder:{
    color:'red',
  },
  bar_Btn_sign:{
    // borderWidth:0,
    marginTop:25,
    color:'white',
    // borderRadius:60,
    fontFamily:'Jalnan',
    paddingLeft:30,
    paddingTop:15,
    paddingRight:30,
    paddingBottom:15,
    fontSize:20,
    backgroundColor:'#f05052',
    // elevation:8,
    marginBottom:10,
    width: 1000,
    // textAlign: 'center',
    
  }
});
export default withNavigation(Sign_up);
