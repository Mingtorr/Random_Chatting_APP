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


export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name1: "",
      pass: "",
      
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
    navigation.navigate('Signup')
  };
  render(){
    return(
      <View style={styles.White_login}>
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
  White_login:{
    
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flex:1,
    backgroundColor:"#c7d9ff"
  },
  Container_login:{
    display:"flex",
    flexDirection:"column",
    
    justifyContent:"space-evenly",
    alignItems:"center",
    backgroundColor:"white",
    width:'80%',
    borderRadius:60,
    
  },
  Textbox_login:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
   
   
  },  Textbox_login2:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    marginTop:20
   
  },
  Intro_login:{
    marginTop:0,
    fontSize:15,
    color:"#f05052",
    fontFamily:"Jalnan"
  },
  Intro_login2:{
    marginTop:0,
    fontSize:30,
    color:"#f05052",
    fontFamily:"Jalnan"
  },
  Text_login:{
    display:"flex",
    flexDirection:'row',
    width:'80%',
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  Text_login_text:{
    fontFamily:'Jalnan',
    fontSize:15,
    color:'#f05052',
  },
  Text_login_input:{
    display:"flex",
    color:'black',
    flex:0.9,
    height:20,
    fontSize:15,
    marginLeft:20,
    padding:0
    
  },Text_login_input2:{
    display:"flex",
    color:'black',
    flex:0.9,
    height:20,
    fontSize:15,
    marginLeft:10,
    padding:0
    
  },
  Btn_login:{
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
  }
});

