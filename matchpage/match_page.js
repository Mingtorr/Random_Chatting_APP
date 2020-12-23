import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Keyboard,
  Text,
  Animated,
  TouchableOpacity,
  Button,
  Switch
} from 'react-native';

import Solo_match from './solomatch';
import Group_match from './groupmatch';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
export default class match_page extends React.Component{
  constructor(props){
    super(props);
    this.state={
      animatedValue:new Animated.Value(140),
      buttonColor1:'#E94e68',
      buttonColor2:'gray',
      chatting:'채팅권 추가',
      title:'내 채팅권 개수',
      isEnabled:false,
      div:<Solo_match/>
    }
  }
  toggleSwitch=()=>{
    if(this.state.isEnabled === true){
      this.setState({
        isEnabled:false
      })
    }else{
      this.setState({
        isEnabled:true
      })
    }
  }
  startAnimationL = () => {
      this.setState({
        chatting:'채팅권 추가',
        buttonColor1:'#E94e68',
        buttonColor2:'gray',
      title:'내 채팅권 개수',
      change:'일반채팅',
      div:<Solo_match/>
      })
      Animated.timing(this.state.animatedValue, {
        duration: 1000,
        toValue: 140,
        useNativeDriver: false,
      }).start();
  };
  startAnimationR = () => {
      this.setState({
        chatting:'과팅권 추가',
        buttonColor1:'gray',
        buttonColor2:'#E94e68',
        title:'내 채팅방권 개수',
        change:'오픈채팅', 
        div:<Group_match/>
      })
      Animated.timing(this.state.animatedValue, {
        duration: 1000,
        toValue: 56,
        useNativeDriver: false,
      }).start();

  };
    render(){
      const windowWidth = Dimensions.get('window').width;
        return(
            <SafeAreaView style = {styles.container}>
              <Animated.View style={{position:'absolute',display:'flex',flexDirection:'column',backgroundColor:'white',height:140,width:'90%',top:this.state.animatedValue,left:'5%',zIndex:999,borderRadius:15,shadowColor: "#000000",shadowOpacity: 0.6,shadowOffset: { width: 2, height: 2 },elevation: 3,}}>
                {/* <View style={{display:'flex',flex:0.2}}>

                </View> */}
                <View style={{display:'flex',flex:0.45,flexDirection:'row',justifyContent:'space-between'}}>
                  <View style={{width:3}}></View>
                  <View style={{marginBottom:10,justifyContent:'center'}}>
                    <TouchableOpacity  onPress={this.startAnimationL} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:this.state.buttonColor1}}>일반채팅</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginBottom:10,justifyContent:'center'}}><Text style={{fontSize:20, color:'gray'}}>|</Text></View>
                  <View style={{marginBottom:10,justifyContent:'center'}}>
                    <TouchableOpacity  onPress={this.startAnimationR} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:15,fontWeight:'bold',color:this.state.buttonColor2}}>오픈채팅</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width:3}}></View>
                </View>
      
                <View style={{display:'flex',flex:0.35,flexDirection:'row'}}>
                  <View style={{display:'flex',flex:0.12}}>

                  </View>
                  <View style={{display:'flex',flex:0.6,justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>{this.state.title}</Text>
                    <View style={{marginTop:8}}>
                    <Text style={{fontSize:11,fontWeight:'bold'}}>하루에 5개씩 지급됩니다!</Text>
                  </View>
                  </View>
                  
                  <View style={{display:'flex',flex:0.28,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>5/5</Text>
                  </View>
                </View>
                <View style={{display:'flex',flex:0.45,flexDirection:'row',justifyContent:'center',marginBottom:10}}>
                  {/* <View style={{flex:0.55,justifyContent:'center',marginLeft:50,flexDirection:'row'}}> */}
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#E94e68', '#eb6c63']} style={styles.linearGradient}  style={{width:110 ,height:40,backgroundColor:'#E94e68',borderRadius:10,justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <Text style={{fontSize:16,fontWeight:'bold',fontFamily:"Jalnan",color:'white'}}>{this.state.chatting}</Text>
                    </LinearGradient>
                  {/* </View> */}
                </View>
              </Animated.View>
              <View style={{display:'flex',backgroundColor:'white',flex:1,flexDirection:'column'}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#E94e68', '#eb6c63']} style={styles.linearGradient} style={{display:'flex',backgroundColor:'red',flex:0.2}}> 
                  <View style={{display:'flex',flex:0.1}}>
                      {/* 채우기용 */}
                  </View>
                  <View style={{display:'flex',flex:0.4,flexDirection:'row'}}> 
                    <View style={{display:'flex',flex:0.05}}>

                    </View>
                    <View style={{display:'flex',justifyContent:'center',alignItems:'center',width:windowWidth}}>
                      <View style={{width:windowWidth}}>
                        <Text style={{height:20}}></Text>
                        <Text style={{fontSize:25,fontFamily:"Jalnan",fontWeight:'900',color:'white',textAlign:'center',display:'flex'}}>일반채팅</Text>
                        <Text style={{fontSize:10,extAlign:'center',color:'white',textAlign:'center',marginTop:15}}>!부적절한 대화나 혐오성 발언은 제재 대상이 될 수 있습니다.</Text>
                      </View>
                    </View>
                    
                    
                    
                    <View style={{display:'flex',flex:0.7,justifyContent:'center'}}>
                    {/* fontSize:25,fontFamily:"Jalnan",fontWeight:'900',color:'white',textAlign:'center' */}
                      {/* <Text style={{fontSize:16,fontFamily:"Jalnan",fontWeight:'bold',color:'white',paddingBottom:4}}>부적절한 대화나 혐오성 발언은</Text>
                      <Text style={{fontSize:16,fontFamily:"Jalnan",fontWeight:'bold',color:'white'}}>제재 대상이 될 수 있습니다.</Text> */}
                    </View>
                  </View>
                  {/* <View style={{display:'flex',flex:0.05,backgroundColor:'black'}}>
            
                  </View> */}
                </LinearGradient>
                <View style={{display:'flex',flex:0.8}}>
                  {this.state.div}
                </View>
              </View>
            </SafeAreaView>
        )
      }
}
const Tab = createMaterialTopTabNavigator();

function Match_tab() {
  return (
    <Tab.Navigator 
    tabBarOptions =
      {{activeTintColor:'red',
      inactiveTintColor:'gray',
        style: {backgroundColor: 'white',color:'red'},
        indicatorStyle:{backgroundColor:'red'},
        labelStyle: {fontSize: 15,fontFamily:"Jalnan"},
      }}>
      <Tab.Screen name="오픈채팅" component={A1} />
      <Tab.Screen name="일반채팅" component={A1} />
    </Tab.Navigator>
    
  );
}
function A1() {
  return (
    <View style={{backgroundColor:'white',display:'flex',flex:1}}>

    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white"
    },
})