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
  FlatList,
  CheckBox,
} from 'react-native';
import FriendInbox from './friendInbox';
// import FriendsInbox from './friendsInbox';
import Grouproom from './grouproom';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import io from 'socket.io-client'


export default class messageCollect extends React.Component{
  constructor(props){
    super(props);
    
    this.state={
      name1: "",
      pass: "",
      outButtonBool: true,
    }
  }

  testOnClick = () => {
    console.log('test');
    const post = {
      test: '들어갓',
      test1: '들어갓2'
    };
    fetch('http://192.168.42.191:3001/Test',{
      method: 'post',
      headers:{
        'content-type': 'application/json',
      },
      body:JSON.stringify(post),
    })
    .then((res) => res.json())
    .then((json) => {
      if(json.boolean){
        alert('데이터 입력 성공')
      }
    });
  };

  toggleOut = () =>{
    this.setState({
      outButtonBool: !this.state.outButtonBool
    });
  }
  gomessage = () =>{
    this.props.navigation.navigate('Login');
  }
  render(){
    return(
      <SafeAreaView style = {styles.container}>
        <View style ={styles.messageHead}>
          <Text style ={{fontSize: 18, fontWeight: 'bold'}}>Message</Text>
          <TouchableOpacity
            onLongPress = {this.testOnClick}
            onPress = {() => this.setState({
            outButtonBool: !this.state.outButtonBool}) }>
            <Text style ={{fontSize:15, fontWeight:'bold'}}>편집</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.collectBody}>
          <MessageTab outButtonBool = {this.state.outButtonBool} go = {this.props.navigation}/>
        </View>
      </SafeAreaView>
    )
  }
}

const Tab = createMaterialTopTabNavigator();

function MessageTab(props) {
  return (
    <Tab.Navigator tabBarOptions =
      {{style: {backgroundColor: 'none' ,width:'100%', height:48, marginTop:-8}, 
        // tabStyle:{ width:70},
        labelStyle: {fontSize: 16, fontWeight:'bold' },
        activeTintColor: '#eb6c63',
        inactiveTintColor: '#bababa',
        indicatorStyle:{
          borderColor:'#eb6c63',
          borderWidth: 2,
          backgroundColor:'#eb6c63',
        }
      }}>
      <Tab.Screen name="1:1" children = {()=> <FriendInbox outButtonBool ={props.outButtonBool} go={props.go}/>}/>
      <Tab.Screen name="오픈채팅" children= {() => <Grouproom go={props.go}/>} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  messageHead:{
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  collectHead:{
    height: "7%",
    backgroundColor: "#a1bdff",
    flexDirection: "row",
    alignItems: "center"
  },
  headFont:{
    fontSize:25,
    paddingLeft: 10,
    paddingRight: 5,
  }, 
  collectBody:{
    flex:1,
    backgroundColor: "white",
  },
  tabBar:{
    backgroundColor:'red'
  },
  outButton:{
    width: '20%',
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    marginLeft : '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outNavigation:{
    position: 'absolute',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems:'center',
    width:'100%',
    height:40,
    backgroundColor: 'red',
    paddingLeft: 10,
    paddingRight: 15,
    zIndex: 1,
  },
})