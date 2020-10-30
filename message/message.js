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
  Image,
  FlatList
} from 'react-native';
import Mymessage from './mymessage'
import Yourmessage from './yourmessage'
const arr = [
  {key:0,name:'정영빈',message:'ㅁㅁㅁ',owner:false}
  ,{key:1,name:'정영빈',message:'ㅋㅋㅋ',owner:false},
  {key:2,name:'정영빈',message:'ㅉㅉㅉㅈ',owner:true},
  {key:3,name:'정영빈',message:'으어어어',owner:false},
  {key:4,name:'정영빈',message:'이이이잉ㅇ',owner:false},
  {key:5,name:'정영빈',message:'나는나는',owner:true},
  {key:6,name:'정영빈',message:'너너너너',owner:true},
  {key:7,name:'정영빈',message:'너너나나나나나',owner:false},
  {key:8,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ',owner:false},
  {key:9,name:'정영빈',message:'퉁ㅁㄴㅇ',owner:true},
  {key:10,name:'정영빈',message:'ㅁㅁㅁ',owner:true}
  ,{key:11,name:'정영빈',message:'ㅋㅋㅋ',owner:true},
  {key:12,name:'정영빈',message:'ㅉㅉㅉㅈ',owner:false},
  {key:13,name:'정영빈',message:'으어어어',owner:false},
  {key:14,name:'정영빈',message:'이이이잉ㅇ',owner:false},
  {key:15,name:'정영빈',message:'나는나는',owner:true},
  {key:16,name:'정영빈',message:'너너너너',owner:false},
  {key:17,name:'정영빈',message:'너너나나나나나',owner:false},
  {key:18,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ',owner:true},
  {key:19,name:'정영빈',message:'퉁ㅁㄴㅇ',owner:false},
  {key:20,name:'정영빈',message:'ㅁㅁㅁ',owner:false}
  ,{key:21,name:'정영빈',message:'ㅋㅋㅋ',owner:true},
  {key:22,name:'정영빈',message:'ㅉㅉㅉㅈ',owner:false},
  {key:23,name:'정영빈',message:'으어어어',owner:false},
  {key:24,name:'정영빈',message:'이이이잉ㅇ',owner:false},
  {key:25,name:'정영빈',message:'나는나는',owner:true},
  {key:26,name:'정영빈',message:'너너너너',owner:false},
  {key:27,name:'정영빈',message:'너너나나나나나',owner:true},
  {key:28,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ',owner:false},
  {key:29,name:'정영빈',message:'퉁ㅁㄴㅇ',owner:false},
  {key:30,name:'정영빈',message:'ㅁㅁㅁ',owner:false}
  ,{key:31,name:'정영빈',message:'ㅋㅋㅋ',owner:false},
  {key:32,name:'정영빈',message:'ㅉㅉㅉㅈ',owner:true},
  {key:33,name:'정영빈',message:'으어어어',owner:true},
  {key:34,name:'정영빈',message:'이이이잉ㅇ',owner:false},
  {key:35,name:'정영빈',message:'나는나는',owner:false},
  {key:36,name:'정영빈',message:'너너너너',owner:false},
  {key:37,name:'정영빈',message:'너너나나나나나',owner:true},
  {key:38,name:'정영빈',message:'ㅋㅋㅋㅋㅋㅋㅋㅋ',owner:true},
  {key:39,name:'정영빈',message:'퉁ㅁㄴㅇ',owner:true},
  {key:40,name:'정영빈',message:'ㅁㅁㅁ',owner:false}

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
  componentDidMount(){
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
                <View style={{display:'flex',flex:0.5,flexDirection:"row"}}>
                  <Image style={{width:20,height:20,marginRight:10}}source={require('./logindot.png')}/>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}>어리고착한콩</Text>
                  <Text style={{fontFamily:"Jalnan",color:'white',fontSize:20}}> 님</Text>
                </View>
               
              </View>
              <View style={{display:"flex",flex:0.88,backgroundColor:'white'}} >
                <FlatList
                  ref={this.scrollViewRef}
                  keyExtractor={item => item.key.toString()}
                  refreshing={this.state.refresh}
                  onRefresh={this.func}
                  data={arr.slice(this.state.start,arr.length)}//여기서
                  renderItem={({item,index}) => { if(item.owner===false){
                    return(<Yourmessage message={item.message}/>)
                  }else{
                    return(<Mymessage message={item.message}/>)
                  }}}
                  />
              </View>
              <View style={{display:"flex",flex:0.06,backgroundColor:'white',flexDirection:'row',justifyContent:'center'}}>
                <TextInput style={{display:'flex',flex:0.8,marginTop:5,marginBottom:5,backgroundColor:'#dcdcdc82',borderRadius:24,paddingLeft:10,paddingRight:10}}/>
                <TouchableOpacity style={{display:'flex',marginTop:5,marginLeft:20}}>
                  <Image style={{width:35,height:35}} source={require('./sendmessage.png')}/>
                </TouchableOpacity>
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
        flex:0.06,
        flexDirection:'row',
        backgroundColor:'#a1bdff',
        justifyContent:"center",
        alignItems:"center",
    }
});

