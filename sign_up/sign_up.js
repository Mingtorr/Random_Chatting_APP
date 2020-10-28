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
  TextInput
} from 'react-native';
import { withNavigation } from 'react-navigation';

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
      
      
    }
  }
  handleName = (e) => {
    this.setState({
      name1: e,
    });
    console.log(this.state.name1);
  };
  handleName2 = (e) => {
    this.setState({
      pass: e,
    });
    console.log(this.state.pass);
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
  singupBtn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Signup')
  };
  render(){
    return(
      <View style={styles.White_sign}>
        

        <View style={styles.Container_sign}>
          <View style={styles.Textbox_sign2}>
            <Text style={styles.Intro_sign}>와글와글</Text>
          </View>
          <View style={styles.Textbox_sign}>
            <Text style={styles.Intro_sign2}>회원 가입</Text>
          </View>
          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>아이디</Text>
            <TextInput style={styles.Text_sign_input} id="id"
              value={this.state.id}
              onChangeText={this.handleName}/>
          </View>
          
          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>비밀번호</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw"
              name="pw"
              value={this.state.pw}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>비밀번호 확인</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View>

         

          
          <Text style={styles.sign_explain}>학과와 학번은 더 많은 기능들을 위해 사용됩니다.</Text>
          
          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>이메일</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>인증번호</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View>

          <Text style={styles.sign_explain}>창원대 이메일으로 만 가입이 가능합니다.</Text>


          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>학과</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>학번</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View>
          <View>
            <TouchableOpacity style={styles.Btn_sign} onPress={this.onclick}>
              <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}}>확인</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>학번</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View> */}
          {/* <View style={styles.login_button_view}>
            <TouchableOpacity style={{marginRight:20}} onPress={this.singupBtn}>
              <Text style={{fontSize:15,fontFamily:'Jalnan'}}>처음이신가요?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text  style={{fontSize:15,fontFamily:'Jalnan'}}>ID/PW 찾기</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
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
    backgroundColor:"#c7d9ff"
  },
  Container_sign:{
    display:"flex",
    flexDirection:"column",
    
    justifyContent:"space-evenly",
    alignItems:"center",
    backgroundColor:"white",
    width:'80%',
    borderRadius:60,
    
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
    marginTop:20
   
  },
  Intro_sign:{
    marginTop:0,
    fontSize:15,
    color:"#f05052",
    fontFamily:"Jalnan"
  },
  Intro_sign2:{
    marginTop:0,
    fontSize:30,
    color:"#f05052",
    fontFamily:"Jalnan"
  },
  Text_sign:{
    display:"flex",
    flexDirection:'row',
    width:'80%',
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  Text_sign_text:{
    fontFamily:'Jalnan',
    fontSize:15,
    color:'#f05052',
  },
  Text_sign_input:{
    display:"flex",
    color:'black',
    flex:0.9,
    height:20,
    fontSize:15,
    marginLeft:20,
    padding:0
    
  },Text_sign_input2:{
    display:"flex",
    color:'black',
    flex:0.9,
    height:20,
    fontSize:15,
    marginLeft:10,
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
  sign_explain:{
      marginTop:15,
  }
});
export default withNavigation(Sign_up);
