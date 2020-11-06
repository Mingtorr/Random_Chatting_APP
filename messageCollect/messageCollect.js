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
  outMessage =() =>{
    alert("adf")
  }

  render(){
    return(            
      <SafeAreaView style = {styles.container}>
        <View style = {styles.collectBody}>
          
          <TouchableOpacity style={styles.outButton} onPress = {this.outMessage}>
            <Text>나가기</Text>
          </TouchableOpacity>
          <MessageTab/>
          
        </View>
      </SafeAreaView>
    )
  }
} 

const Tab = createMaterialTopTabNavigator();

function MessageTab() {
  return (
    <Tab.Navigator tabBarOptions =
      {{style: {backgroundColor: 'none' ,width:'80%'}, 
        tabStyle:{ width:100},
        labelStyle: {fontSize: 15}
      }}>
      <Tab.Screen name="1:1" component={FriendInbox} />
      <Tab.Screen name="과팅" component={FriendsInbox} />
      {/* <Tab.Screen name="편집" options = {} */}
      {/* <Tab.Screen name ="나가기"  /> */}
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
    backgroundColor: "white",
    // width: '80%',
  },
  tabBar:{
    backgroundColor:'red'
  },
  outButton:{
    display: 'flex',
    width: '20%',
    height: 50,
    backgroundColor: 'white',
    position: 'absolute',
    marginLeft : '80%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})