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

export default class Mymessage extends React.Component{
    render(){
        return(
            <View style={{display:'flex',borderColor:'black',borderWidth:1,flexDirection:'row',justifyContent:'flex-end',marginBottom:5,marginTop:5}}>
                <View style={{display:'flex',backgroundColor:'#c7d9ff',marginRight:16,maxWidth:'70%',paddingLeft:20,paddingRight:20,paddingBottom:10,paddingTop:10,borderRadius:28}}>
                    <Text style={{fontSize:18}}>안녕하세요 오빠야 ㅎㅎ</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
});