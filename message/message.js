/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity ,
  Button,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import io from "socket.io-client";
import Mymessage from './mymessage'
import Yourmessage from './yourmessage'

const socket = io("http://172.20.10.2:3001");


const keyboardVerticalOffset = Platform.OS === 'ios' ? 15 : 0
export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.scrollViewRef = React.createRef();
    this.state={
      userkey: 1,
      name2:'',
      pass: "",
      start:0,
      page:1,
      refresh:false,
      lastownername:false,
      arr : [],
      text:'',
      id:'aaa'
    }
  }
  componentDidMount(){
    console.log(this.state.start+"tltltltllqkfkqfkqkfqkfkqfk");
    const data = {
      userkey:this.state.userkey,

    }
    fetch("http://172.20.10.2:3001/showmessage", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(res=>res.json()).then((json)=>{
    json.map((value,index)=>{
      console.log(value);
      const row = {
        key : value.message_key,
        name : '정영빈',
        message : value.message_body,
        owner:false
      }
      this.setState({
        arr:[...this.state.arr,row],
      })
      if(this.state.arr.length >20){
        this.setState({
          start:this.state.arr.length-20
        },this.scrolltobottom())
      }else{
        this.setState({
          start:0
        },this.scrolltobottom())
      }
    })
  });
    if(this.state.arr.length>20){
      this.setState({
        start:this.state.arr.length-20
      })
    }
    
    console.log('zzzzzzzzzzzzzz'+this.state.arr.length);
    console.log(this.state.page);
    socket.on('recieve_message',(message)=>{
      console.log("메시지"+message);
      this.setState({
        arr:[...this.state.arr,message]
      })
      this.scrolltobottom();
    })
}
sendmessage=()=>{
  console.log("시발");
  const data = {
    roomid:3,
    userkey:this.state.userkey,
    message:this.state.text,
  }
  fetch("http://172.20.10.2:3001/save_message", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then();
  socket.emit("onclick_message",this.state.text);
  this.setState({
    text:''
  })

   //메시지 보냄
}
scrolltobottom=()=>{
    setTimeout(()=>{
      if ((this.scrollViewRef !== null) && (this.scrollViewRef.current !== null)){
        this.scrollViewRef.current.scrollToEnd({animated: false});
    }
    },400)
}
scrolltomessage=()=>{
  console.log('arr크기'+(this.state.arr.length-this.state.start));
  setTimeout(()=>{
    if(this.state.arr.length-this.state.start<20){
    }else{
      this.scrollViewRef.current.scrollToIndex({animated: false,index:19});
    }
  },400)
}
func=()=>{
  if(this.state.start<19){
    this.setState({
      refresh:true,
      start:0
    },()=>{
      console.log(this.state.start);
      this.setState({
        refresh:false
      })
    })
  }else{
    this.setState({
      refresh:true,
      start:this.state.start-20,
    },()=>{
      console.log(this.state.start);
      this.scrolltomessage();
      this.setState({
        refresh:false
      })
    })
  }
}
message_onchange=(e)=>{
  this.setState({
    text:e
  })
  console.log(this.state.text);
}
wholastmessage=()=>{
  this.setState({
    lastownername:true
  })
}
wholastmessage2=()=>{
  this.setState({
    lastownername:false
  })
}
rendermessage=({item,index})=>{
  {
    if(index===0){ 
      if(this.state.id === item.name){
        console.log('5번'+item.message);
        return(<Mymessage message={item.message}/>)
      }else{
        console.log('4번'+item.message);
        return(<Yourmessage message={item.message} pre={false}/>)
      }
    }else{
      
      if(this.state.arr[this.state.start+index-1].name === item.name)
      {
        if(this.state.id === item.name){
          console.log('3번'+item.message);
          return( <Mymessage message={item.message}/>)
        }else{
          console.log('2번'+item.name+item.message);
          return(<Yourmessage message={item.message} pre={true}/>)
        }
      }
      else{
        console.log('1번'+item.message);
        if(this.state.id === item.name){
          return(<Mymessage message={item.message}/>)
        }else{
          return(<Yourmessage message={item.message} pre={false}/>)
        }
      }
      console.log(this.state.start);
      console.log(index);
      console.log(this.state.arr[1]);
    } 
}
}

  render(){
    return(
          <SafeAreaView style={styles.message_safe}>
            <KeyboardAvoidingView style={styles.message_safe} behavior='padding' onAccessibilityAction={this.scrolltobottom} keyboardVerticalOffset={keyboardVerticalOffset}>
              <View style={styles.message_top} >
                <View style={{display:'flex',flex:0.5,flexDirection:"row"}}>
                  <Image style={{width:20,height:20,marginRight:10}}source={require('./logindot.png')}/>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}>어리고착한콩</Text>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}> 님</Text>
                </View>
              </View>
              <View style={{display:"flex",flex:0.93,backgroundColor:'white'}} >
                <FlatList
                  ref={this.scrollViewRef}
                  keyExtractor={item => item.key.toString()}
                  refreshing={this.state.refresh}
                  onRefresh={this.func}
                  data={this.state.arr.slice(this.state.start,this.state.arr.length)}//여기서
                  renderItem={this.rendermessage}
                  />
              </View>
              <View  style={{display:"flex",flex:0.06,backgroundColor:'white',flexDirection:'row',justifyContent:'center',marginBottom:10}}>
              
                <TextInput value={this.state.text} id="text" name="text" onChangeText={this.message_onchange} onTouchStart={this.scrolltobottom} style={{display:'flex',height:30,width:300,marginTop:5,marginBottom:5,backgroundColor:'#dcdcdc82',borderRadius:24,paddingLeft:10,paddingRight:10}} on/>
   
                <TouchableOpacity style={{display:'flex',marginTop:5,marginLeft:20}} onPress={this.sendmessage}>
                  <Image style={{width:35,height:35}} source={require('./sendmessage.png')}/>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
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
        backgroundColor:'white',
        flex:1,
        flexDirection:"column"
    },
    message_top:{
        display:"flex",
        height:50,
        flexDirection:'row',
        backgroundColor:'#a1bdff',
        justifyContent:"center",
        alignItems:"center",
    }
});

