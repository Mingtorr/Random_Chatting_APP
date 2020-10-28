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
    this.scrollViewRef = React.createRef();
    this.state={
      name1: "",
      pass: "",
      
    }
  }
  componentWillMount(){
      this.scrolltobottom();
  }
  scrolltobottom=()=>{
      setTimeout(()=>{
          this.scrollViewRef.current.scrollToEnd({animated: false});
      },300)
  }
  render(){
    return(
          <SafeAreaView style={styles.message_safe}>
              <View style={styles.message_top}>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}>어리고착한콩</Text>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}> 님</Text>
              </View>
              <View style={{display:"flex",flex:0.85,backgroundColor:'white'}} >
              <ScrollView ref={this.scrollViewRef}>
                     <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>asdasdsadsadasdsad</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
                    <Text style={{fontSize:50}}>힝힝힝</Text>
              </ ScrollView>
              </View>
              <View style={{display:"flex",flex:0.08,backgroundColor:'black'}}>

              </View>
          </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    message_main:{
        display:"flex",
        backgroundColor:'#c7d9ff',
        flex:1
    },
    message_safe:{
        display:"flex",
        backgroundColor:'#c7d9ff',
        flex:1,
        flexDirection:"column"
    },
    message_top:{
        display:"flex",
        flex:0.08,
        flexDirection:'row',
        backgroundColor:'blue',
        justifyContent:"center",
        alignItems:"center"
    }
});

