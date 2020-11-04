/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login/login';
import Signup from './sign_up/sign_up';
import Signup2 from './sign_up/sign_up2';
import Signup3 from './sign_up/sign_up3';
import Main from './main/Main';
import Groupmatch from './groupmatch/groupmatch';
import Message from './message/message';
import Find_idpw from './Find_idpw/Find_idpw';
import Splash from './splash/Splash';
import Setting from './settingpage/Setting';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageCollect from './messageCollect/messageCollect'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity ,
  Button,
  TextInput
} from 'react-native';


const Stack = createStackNavigator();
 export default class App extends React.Component{
  state={
    isLoading : false, //false면 스플래시
    isLogin : false, // 로그인하면 true로 변경
  };
  componentDidMount= async() => {  
    setTimeout(() => {this.setState({isLoading: true})},1000);
  }
  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator>
      {this.state.isLoading ? (
          <>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Bottom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup2"
          component={Signup2}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup3"
          component={Signup3}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Message"
          component={Message}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
            name="Find_idpw"
            component={Find_idpw}
            options={{ headerShown: false }}
          />
        
        </>
        ):(
        <><Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        /></>)
        }
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}


const Tab = createBottomTabNavigator();

function Bottom() {
  return (
    <Tab.Navigator>
      {/* 친구찾기 */}
      <Tab.Screen name="Man" component={Main} />
      {/* 친구들 찾기 */}
      <Tab.Screen name="Group" component={Groupmatch} />
      {/* 메세지함 */}
      <Tab.Screen name="MessageCollect" component={MessageCollect} />
      {/* 알림  나중에 알람넣어요*/}
      <Tab.Screen name="알림" component={Message}/>
      {/* 설정 */}
      <Tab.Screen name="Setting" component={Setting} />
      
    </Tab.Navigator>
  );
}


