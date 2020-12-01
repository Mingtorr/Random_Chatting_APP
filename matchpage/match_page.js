import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Keyboard
} from 'react-native';

import Solo_match from './solo_match';
import Group_match from './group_match';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class match_page extends React.Component{

    render(){
        return(
            <SafeAreaView style = {styles.container}>
                <Match_tab/>
            </SafeAreaView>
        )
      }
}

const Tab = createMaterialTopTabNavigator();

function Match_tab() {
  return (
    <Tab.Navigator tabBarOptions =
      {{style: {backgroundColor: '#a1bdff'},
        labelStyle: {fontSize: 15},
      }}>
      <Tab.Screen name="1:1" component={Solo_match} />
      <Tab.Screen name="과팅" component={Group_match} />
    </Tab.Navigator>
    
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white"
    },
})