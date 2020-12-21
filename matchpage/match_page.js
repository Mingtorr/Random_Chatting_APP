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

export default class match_page extends React.Component{
  constructor(props){
    super(props);
    this.state={
      animatedValue:new Animated.Value(140),
      click:false,
      chatting:'채팅권추가',
      title:'만들수 있는 채팅 수',
      change:'과팅',
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
  startAnimation = () => {
    if(this.state.click === false){
      this.setState({
        click:true,
        chatting:'과팅권추가',
        title:'만들수 있는 과팅 수',
        change:'1 : 1',
        div:<Group_match/>
      })
      Animated.timing(this.state.animatedValue, {
        duration: 1000,
        toValue: 56,
        useNativeDriver: false,
      }).start();
    }else{
      this.setState({
        click:false,
        chatting:'채팅권추가',
      title:'만들수 있는 채팅 수',
      change:'과팅',
      div:<Solo_match/>
      })
      Animated.timing(this.state.animatedValue, {
        duration: 1000,
        toValue: 140,
        useNativeDriver: false,
      }).start();
    }
  };
    render(){
        return(
            <SafeAreaView style = {styles.container}>
              <Animated.View style={{position:'absolute',display:'flex',flexDirection:'column',backgroundColor:'white',height:140,width:'90%',top:this.state.animatedValue,left:'5%',zIndex:999,borderRadius:24,shadowColor: "#000000",shadowOpacity: 0.6,shadowOffset: { width: 2, height: 2 },elevation: 3,}}>
                <View style={{display:'flex',flex:0.2}}>

                </View>
                <View style={{display:'flex',flex:0.35,flexDirection:'row'}}>
                  <View style={{display:'flex',flex:0.12}}>

                  </View>
                  <View style={{display:'flex',flex:0.6,justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>{this.state.title}</Text>
                  </View>
                  <View style={{display:'flex',flex:0.28,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>5/5</Text>
                  </View>
                </View>
                <View style={{display:'flex',flex:0.45,flexDirection:'row'}}>
                  <View style={{display:'flex',flex:0.4,marginBottom:10,marginLeft:50,justifyContent:'center'}}>
                    <TouchableOpacity  onPress={this.startAnimation} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:15,fontWeight:'bold',fontFamily:"Jalnan",color:'red'}}>{this.state.change}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{display:'flex',flex:0.55,justifyContent:'center',marginLeft:50,flexDirection:'row'}}>
                    <View style={{display:'flex',height:40,flex:0.85,backgroundColor:'red',borderRadius:40,justifyContent:'center',alignItems:'center',marginLeft:10,marginTop:10}}>
                    <Text style={{fontSize:16,fontWeight:'bold',fontFamily:"Jalnan",color:'white'}}>{this.state.chatting}</Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
              <View style={{display:'flex',backgroundColor:'white',flex:1,flexDirection:'column'}}>
                <View style={{display:'flex',backgroundColor:'red',flex:0.2}}>
                  <View style={{display:'flex',flex:0.1}}>

                  </View>
                  <View style={{display:'flex',flex:0.4,flexDirection:'row'}}> 
                    <View style={{display:'flex',flex:0.05}}>

                    </View>
                    <View style={{display:'flex',flex:0.08,alignItems:"center",justifyContent:'center'}}>
                      <Text style={{fontSize:25,fontFamily:"Jalnan",fontWeight:'900',color:'white'}}>!</Text>
                    </View>
                    <View style={{display:'flex',flex:0.7,justifyContent:'center'}}>
                      <Text style={{fontSize:16,fontFamily:"Jalnan",fontWeight:'bold',color:'white',paddingBottom:4}}>부적절한 대화나 혐오성 발언은</Text>
                      <Text style={{fontSize:16,fontFamily:"Jalnan",fontWeight:'bold',color:'white'}}>제재 대상이 될 수 있습니다.</Text>
                    </View>
                  </View>
                  <View style={{display:'flex',flex:0.05,backgroundColor:'red'}}>
            
                  </View>
                </View>
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
      <Tab.Screen name="1:1" component={A1} />
      <Tab.Screen name="과팅" component={A1} />
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