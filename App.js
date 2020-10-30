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
import Message from './message/message';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  render(){
    return(
      <NavigationContainer>
      <Stack.Navigator>
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
      <Tab.Screen name="Mans" component={Main} />
      {/* 메세지함 */}
      <Tab.Screen name="Message" component={Message} />
      {/* 설정 */}
      <Tab.Screen name="Setting" component={Message} />
    </Tab.Navigator>
  );
}


