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
  FlatList
} from 'react-native';

export default class Firstmessage extends React.Component{
    render(){
        return(
          <View style={{display:'flex',flexDirection:"column",justifyContent:'center',marginBottom:10,marginTop:20,alignItems:'center'}}>
          <View style={{display:"flex"}}>
              <View style={{display:'flex'}}>
              <Text style={{fontSize:12,fontFamily:"Jalnan"}}>{this.props.message}</Text>
              </View>
          </View>
      </View>
        )
    }
}

const styles = StyleSheet.create({
   
});