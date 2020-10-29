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
  FlatList
} from 'react-native';

const arr = [
  {key:0,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:1,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:2,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:3,name:'정영빈',message:'으어어어'},
  {key:4,name:'정영빈',message:'이이이잉ㅇ'},
  {key:5,name:'정영빈',message:'나는나는'},
  {key:6,name:'정영빈',message:'너너너너'},
  {key:7,name:'정영빈',message:'너너나나나나나'},
  {key:8,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:9,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:10,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:11,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:12,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:13,name:'정영빈',message:'으어어어'},
  {key:14,name:'정영빈',message:'이이이잉ㅇ'},
  {key:15,name:'정영빈',message:'나는나는'},
  {key:16,name:'정영빈',message:'너너너너'},
  {key:17,name:'정영빈',message:'너너나나나나나'},
  {key:18,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:19,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:20,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:21,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:22,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:23,name:'정영빈',message:'으어어어'},
  {key:24,name:'정영빈',message:'이이이잉ㅇ'},
  {key:25,name:'정영빈',message:'나는나는'},
  {key:26,name:'정영빈',message:'너너너너'},
  {key:27,name:'정영빈',message:'너너나나나나나'},
  {key:28,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:29,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:30,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:31,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:32,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:33,name:'정영빈',message:'으어어어'},
  {key:34,name:'정영빈',message:'이이이잉ㅇ'},
  {key:35,name:'정영빈',message:'나는나는'},
  {key:36,name:'정영빈',message:'너너너너'},
  {key:37,name:'정영빈',message:'너너나나나나나'},
  {key:38,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:39,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:40,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:41,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:42,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:43,name:'정영빈',message:'으어어어'},
  {key:44,name:'정영빈',message:'이이이잉ㅇ'},
  {key:45,name:'정영빈',message:'나는나는'},
  {key:46,name:'정영빈',message:'너너너너'},
  {key:47,name:'정영빈',message:'너너나나나나나'},
  {key:48,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:49,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:50,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:51,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:52,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:53,name:'정영빈',message:'으어어어'},
  {key:54,name:'정영빈',message:'이이이잉ㅇ'},
  {key:55,name:'정영빈',message:'나는나는'},
  {key:56,name:'정영빈',message:'너너너너'},
  {key:57,name:'정영빈',message:'너너나나나나나'},
  {key:58,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:59,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:60,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:61,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:62,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:63,name:'정영빈',message:'으어어어'},
  {key:64,name:'정영빈',message:'이이이잉ㅇ'},
  {key:65,name:'정영빈',message:'나는나는'},
  {key:66,name:'정영빈',message:'너너너너'},
  {key:67,name:'정영빈',message:'너너나나나나나'},
  {key:68,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:69,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:70,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:71,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:72,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:73,name:'정영빈',message:'으어어어'},
  {key:74,name:'정영빈',message:'이이이잉ㅇ'},
  {key:75,name:'정영빈',message:'나는나는'},
  {key:76,name:'정영빈',message:'너너너너'},
  {key:77,name:'정영빈',message:'너너나나나나나'},
  {key:78,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:79,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:80,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:81,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:82,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:83,name:'정영빈',message:'으어어어'},
  {key:84,name:'정영빈',message:'이이이잉ㅇ'},
  {key:85,name:'정영빈',message:'나는나는'},
  {key:86,name:'정영빈',message:'너너너너'},
  {key:87,name:'정영빈',message:'너너나나나나나'},
  {key:88,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:89,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:90,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:91,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:92,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:93,name:'정영빈',message:'으어어어'},
  {key:94,name:'정영빈',message:'이이이잉ㅇ'},
  {key:95,name:'정영빈',message:'나는나는'},
  {key:96,name:'정영빈',message:'너너너너'},
  {key:97,name:'정영빈',message:'너너나나나나나'},
  {key:98,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:99,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:100,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:101,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:102,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:103,name:'정영빈',message:'으어어어'},
  {key:104,name:'정영빈',message:'이이이잉ㅇ'},
  {key:105,name:'정영빈',message:'나는나는'},
  {key:106,name:'정영빈',message:'너너너너'},
  {key:107,name:'정영빈',message:'너너나나나나나'},
  {key:108,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:109,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:110,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:111,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:112,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:113,name:'정영빈',message:'으어어어'},
  {key:114,name:'정영빈',message:'이이이잉ㅇ'},
  {key:115,name:'정영빈',message:'나는나는'},
  {key:116,name:'정영빈',message:'너너너너'},
  {key:117,name:'정영빈',message:'너너나나나나나'},
  {key:118,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:119,name:'정영빈',message:'퉁ㅁㄴㅇ'},
  {key:120,name:'정영빈',message:'ㅁㅁㅁ'}
  ,{key:121,name:'정영빈',message:'ㅋㅋㅋ'},
  {key:122,name:'정영빈',message:'ㅉㅉㅉㅈ'},
  {key:123,name:'정영빈',message:'으어어어'},
  {key:124,name:'정영빈',message:'이이이잉ㅇ'},
  {key:125,name:'정영빈',message:'나는나는'},
  {key:126,name:'정영빈',message:'너너너너'},
  {key:127,name:'정영빈',message:'너너나나나나나'},
  {key:128,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ'},
  {key:129,name:'정영빈',message:'퉁ㅁㄴㅇ'},
]

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.scrollViewRef = React.createRef();
    this.state={
      name1: "",
      pass: "",
      start:0,
      page:1,
      refresh:false
    }
  }
  componentWillMount(){
    this.setState({
      start:arr.length-20
    })
    this.scrolltobottom();
    console.log('zzzzzzzzzzzzzz'+arr.length);
    console.log(this.state.page);
}
scrolltobottom=()=>{
    setTimeout(()=>{
        this.scrollViewRef.current.scrollToEnd({animated: false});
    },300)
}
scrolltomessage=()=>{
  console.log('arr크기'+(arr.length-this.state.start));
  setTimeout(()=>{
    if(arr.length-this.state.start<20){
    }else{
      this.scrollViewRef.current.scrollToIndex({animated: false,index:19});
    }
  },300)
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
  render(){
    return(
          <SafeAreaView style={styles.message_safe}>
              <View style={styles.message_top}>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}>어리고착한콩</Text>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}> 님</Text>
              </View>
              <View style={{display:"flex",flex:0.85,backgroundColor:'white'}} >
                <FlatList
                  ref={this.scrollViewRef}
                  keyExtractor={item => item.key.toString()}
                  refreshing={this.state.refresh}
                  onRefresh={this.func}
                  data={arr.slice(this.state.start,arr.length)}//여기서
                  renderItem={({item,index}) => { return(<Text key={item.key} style={{fontSize:20}}>{index}번{item.message}</Text>)}}
                  />
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
        backgroundColor:'#a1bdff',
        justifyContent:"center",
        alignItems:"center"
    }
});

