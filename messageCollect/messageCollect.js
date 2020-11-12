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
import Test1 from './test1'
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
  onOutButton = () =>{
    // this.FriendInbox.current.toggleOutButton();
  }

  render(){
    return(
      <SafeAreaView style = {styles.container}>
        <View style = {styles.collectBody}>
          <MessageTab outButtonBool = {this.state.outButtonBool}/>
          <TouchableOpacity style={styles.outButton} 
          onPress = {() => this.setState({
          outButtonBool: !this.state.outButtonBool
          }) }>
        <Text>나가기</Text>
      </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const Tab = createMaterialTopTabNavigator();

function MessageTab(props) {
  return (
    <Tab.Navigator tabBarOptions =
      {{style: {backgroundColor: 'none' ,width:'100%'}, 
        tabStyle:{ width:100},
        labelStyle: {fontSize: 15}
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