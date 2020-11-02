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
} from 'react-native';
import FriendInbox from './friendInbox';
import FriendsInbox from './friendsInbox';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default class messageCollect extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name1: "",
      pass: "",
    }
  }
  
  render(){
    return(            
      <SafeAreaView style = {styles.container}>
        <View style = {styles.collectBody}>
          <MessageTab></MessageTab>
        </View>
      </SafeAreaView>
    )
  }
} 

const Tab = createMaterialTopTabNavigator();

function MessageTab() {
  return (
    <Tab.Navigator tabBarOptions =
      {{style: {backgroundColor: '#c7d9ff'}, 
        tabStyle:{ width:100},
        labelStyle: {fontSize: 15}
      }}>
      <Tab.Screen name="1:1" component={FriendInbox} />
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
    backgroundColor: "white"
  },
  tabBar:{
    backgroundColor:'red'
  }
})