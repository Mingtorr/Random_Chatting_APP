/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    Alert } from 'react-native';
import { withNavigation } from 'react-navigation';


class Find_idpw extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input_text: "",
            email_wait: false,
        };
    }

    backBtn = (e) => {
        e.preventDefault();
        this.props.navigation.navigate('Login')
    };

    email_text = (e) => {
        this.setState({
            input_text: e
        });
    }

    idpw_alert = (e) => {
        console.log(this.state.input_text);
        
        const email_check = {
            email_check: this.state.input_text
        };
        
        Alert.alert(
            "안내",
            "유효하지않은 이메일 형식입니다.",
            [
                {text: "OK", onPress: () => console.log("OK")}
            ]
        );

    };

    render(){
        return(
          <View style={styles.idpw_bg}>
              <TouchableOpacity onPress={this.backBtn}>
              <View style={{marginTop: 20, left:'5%'}}>
                <Image 
                style={{width:25, height:25}}
                source={require('./cancel.png')} />
              </View>
              </TouchableOpacity>

              <View style={styles.idpw_1}>
                <Text style={styles.Intro_idpw1}>와글 와글</Text>
                <Text style={styles.Intro_idpw2}>ID/PW 찾기</Text>
              </View>
              <View style={styles.idpw_2}>
                <Text style={styles.Intro_idpw4}>사용자 이메일을 입력하시면 해당 이메일로</Text>
                <Text style={styles.Intro_idpw4}>ID와 PW를 보내드립니다.</Text>
              </View>
              
              <Text style={styles.Text_idpw_text}>Email</Text>
              <View style={styles.idpw_3}>
                <View style={styles.Text_idpw}>
                    <TextInput style={styles.Text_idpw_input} value={this.state.input_text} onChangeText={this.email_text}/>
                    <Text style={{color:'gray', fontFamily: 'Jalnan', fontSize:15}}>@changwon.ac.kr</Text>
                </View>
              </View>
              <View style={styles.idpw_4}>
                <TouchableOpacity style={styles.Btn_idpw}>
                    <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}} onPress={this.idpw_alert}>전송</Text>
                </TouchableOpacity>
              </View>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
        idpw_bg:{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "white"
        },
        idpw_1:{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        idpw_2:{
            flex: 1,
            alignItems: "center",
        },
        idpw_3:{
            flex: 2.5,
            alignItems: "center"
        },
        idpw_4:{
            alignItems: "center",
            marginBottom: 10
        },


        Intro_idpw1:{
            fontSize: 15,
            color: "#f05052",
            fontFamily: "Jalnan"
        },
        Intro_idpw2:{
            fontSize: 30,
            color: "#f05052",
            fontFamily: "Jalnan"
        },
        Intro_idpw3:{
            fontSize: 20,
            fontFamily:"Jalnan",
            marginBottom: 10,
        },
        Intro_idpw4:{
            fontSize: 17,
            fontFamily:"Jalnan"
        },


        Text_idpw:{
            display:"flex",
            flexDirection:'row',
            width:'90%',
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'gray'
        },
        Text_idpw_text:{
            fontFamily: 'Jalnan',
            fontSize: 15,
            color: '#f05052',
            marginLeft: 20
        },
    
          
        Text_idpw_input:{
            display: "flex",
            color: 'black',
            flex: 0.9,
            height: 25,
            fontSize: 20,
            marginLeft: 10,
            padding: 0,
            alignSelf: "flex-end"
        },


        Btn_idpw:{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#f05052",
            elevation: 8,
            marginTop: 20,
            paddingTop: 10,
            paddingBottom: 10,
        }
    });

export default withNavigation(Find_idpw);