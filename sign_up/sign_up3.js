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
} from 'react-native';
import { withNavigation } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 class Sign_up3 extends React.Component{
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
  singupBtn = (e) => {
    e.preventDefault();
    // this.props.navigation.navigate('Signup')
  };
  render(){
    let radio_props = [     //radio button
      {label: '남    ', value: 0 },
      {label: '여', value: 1 }
    ];
    return(
      <View style={styles.White_sign}>
        

        <View style={styles.Container_sign}>
          <View style={styles.Textbox_sign2}>
            <Text style={styles.Intro_sign}>와글와글</Text>
          </View>
          <View style={styles.Textbox_sign}>
            <Text style={styles.Intro_sign2}>학과/학번</Text>
          </View>
       
          <View style={styles.Text_sign}>
            <Text style={{fontFamily:'Jalnan',fontSize:15,color:'#f05052',marginRight:80,}}>학과</Text>
    
              <RNPickerSelect
              style={{marginBottom:"30", color:"red"}}

                placeholder={{
                  label: '학과선택',
                  value: null,
               }}
              
                 onValueChange={(value) => console.log(value)}
                    items={[
                    { label: '컴퓨터공학과', value: 'computer engineering' },
                    { label: '정보통신공학과', value: 'baseball' },
                    { label: '화학공학과', value: 'hockey' },
                    { label: '전자공학과', value: 'hockey' },
                    { label: '전기공학과', value: 'hockey' },
                      ]}
               />
               
          </View>

          <View style={styles.Text_sign}>
            <Text style={styles.Text_sign_text}>학번</Text>
            <TextInput style={styles.Text_sign_input2}   id="pw2"
              name="pw2"
              value={this.state.pw2}
              secureTextEntry={true}
              onChangeText={this.handleName2}/>
          </View>

          
          <Text style={styles.sign_explain}>필수 입력 항목이 아닙니다</Text>
          <Text style={styles.sign_explain}>하지만 일부 기능에 대해 제한적일 수 있습니다</Text>
          <View>
            <TouchableOpacity style={styles.Btn_sign} onPress={this.onclick}>
              <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}}>완료</Text>
            </TouchableOpacity>
            
          </View>
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
  },
    Textbox_sign2:{
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
  Text_sign_pick:{
    display:"flex",
    flexDirection:'row',
    width:'80%',
    marginTop:15,
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  Text_sign_sex:{
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
    display:'flex',
    // marginRight:80,
  },
  Text_sign_text_sex:{
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
  },
  sel_placeholder:{
    color:'red',
  }
});
export default withNavigation(Sign_up3);
