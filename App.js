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

import Message from './message/message';
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
          component={Message}
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


