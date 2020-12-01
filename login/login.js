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
  Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Swiper from 'react-native-swiper'

 class Login extends React.Component{
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
    this.props.navigation.navigate('Signup')
  };

  find_idpwBtn = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Find_idpw')
  };

  goMain =(e)=>{
    e.preventDefault();
    this.props.navigation.navigate('Main')
  }
  render(){
    return(
      <SafeAreaView style={styles.White_login}>
          <View style={styles.bg1}>
            <View style={styles.Textbox_login2}>
              <Text style={styles.Intro_login}>창원대 매칭앱</Text>
            </View>
            <View style={styles.Textbox_login}>
              <Text style={styles.Intro_login2}>와글와글</Text>
            </View>
          </View>

          <View style={styles.Swiper_bg}>
            <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={3} 
              activeDot={
                <View
                  style={{
                    backgroundColor: '#f05052',
                    width: 9,
                    height: 9,
                    borderRadius: 7,
                    marginLeft: 7,
                    marginRight: 7
                  }}
                />
              }>
            <View style={styles.slide1}>
              <Text style={styles.swiper_text}>'다른 학과' 사람들과 친해질수 있는</Text>
              <Text style={styles.swiper_text}>최고의 방법</Text>
              <Image style={styles.swiper_image} source={require('./swiper_image1.png')} resizeMode="cover"/>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.swiper_text}>창원대</Text>
              <Text style={styles.swiper_text}>창원대</Text>
              <Image style={styles.swiper_image} source={require('./swiper_image1.png')} resizeMode="cover"/>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.swiper_text}>와글와글</Text>
              <Text style={styles.swiper_text}>와글와글</Text>
              <Image style={styles.swiper_image} source={require('./swiper_image1.png')} resizeMode="cover"/>
            </View>
            </Swiper>
          </View>

          <View style={styles.bg2}>
            <View style={styles.Text_login}>
              <Text style={styles.Text_login_text}>아이디</Text>
              <TextInput style={styles.Text_login_input} id="name"
                value={this.state.name1}
                onChangeText={this.handleName}/>
            </View>
            <View style={styles.Text_login}>
              <Text style={styles.Text_login_text}>비밀번호</Text>
              <TextInput style={styles.Text_login_input2}   id="pass"
                name="pass"
                value={this.state.pass}
                secureTextEntry={true}
                onChangeText={this.handleName2}/>
            </View>
          </View>
            
          <View style={styles.bg3}>
            <View style={styles.login_button_view}>
              <TouchableOpacity style={{marginRight:70}} onPress={this.singupBtn}>
                <Text style={{fontSize:15,fontFamily:'Jalnan'}}>처음이신가요?</Text>
              </TouchableOpacity>
              <TouchableOpacity  style={{marginRight:20}} onPress={this.find_idpwBtn}>
                <Text  style={{fontSize:15,fontFamily:'Jalnan'}}>ID/PW 찾기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: "100%"}}>
            <TouchableOpacity style={styles.Btn_login} onPress={this.onclick}>
              <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}} onPress={this.goMain}>로그인</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  login_button_view:{
    display:"flex",
    flexDirection:"row",
    marginTop:20
  },
  White_login:{
    display: "flex",
    alignItems: "center",
    flex:1,
    //backgroundColor:"#c7d9ff"
    backgroundColor:"white",
    justifyContent: "space-between"
  },
  Textbox_login:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },

  Swiper_bg:{
    display:"flex",
    marginTop: 20,
    height: "45%"
  },
  wrapper:{
  },
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
  swiper_image: {
  },
  swiper_text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7
  },
  
  Textbox_login2:{
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
    fontFamily:"Jalnan",
    marginBottom:3
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
    marginTop:25,
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
    
  },
  Text_login_input2:{
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
    marginTop:20,
    color:'white',
    fontFamily:'Jalnan',
    alignItems: "center",
    paddingLeft:30,
    paddingTop:10,
    paddingRight:30,
    paddingBottom:10,
    fontSize:20,
    backgroundColor:'#f05052',
    elevation:8,
    marginBottom:10
  }
});
export default withNavigation(Login);
