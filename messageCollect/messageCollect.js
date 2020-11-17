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
import FriendsInbox from './friendsInbox';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default class messageCollect extends React.Component{
  constructor(props){
    super(props);
    this.FriendInbox = React.createRef();
    this.state={
      name1: "",
      pass: "",
      outButtonBool: true,
    }
  }

  toggleOut = () =>{
    this.setState({
      outButtonBool: !this.state.outButtonBool
    });
  }

  render(){
    return(
      <SafeAreaView style = {styles.container}>
        <View style ={styles.messageHead}>
          <Text style ={{fontSize: 18, fontWeight: 'bold'}}>Message</Text>
          <TouchableOpacity
            onPress = {() => this.setState({
            outButtonBool: !this.state.outButtonBool}) }>
            <Text style ={{fontSize:15, fontWeight:'bold'}}>편집</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.collectBody}>
          {/* <TouchableOpacity style ={styles.outNavigation}>
            <Text>뒤로가기</Text>
            <Text>나가기</Text>
          </TouchableOpacity> */}
          <MessageTab outButtonBool = {this.state.outButtonBool}/>
          
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
        tabStyle:{ width:100},
        labelStyle: {fontSize: 18, fontWeight:'bold' },
        activeTintColor: 'blue',
        inactiveTintColor: 'black'
      }}>
      <Tab.Screen name="1:1" children = {()=> <FriendInbox outButtonBool ={props.outButtonBool}/>} />
      <Tab.Screen name="과팅" component={FriendsInbox} />
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