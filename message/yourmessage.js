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

export default class Yourmessage extends React.Component{
    render(){
        return(
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginBottom:5,marginTop:5}}>
                <View style={{display:'flex',backgroundColor:'#eaeaea',marginLeft:16,maxWidth:'70%',paddingLeft:20,paddingRight:20,paddingBottom:10,paddingTop:10,borderRadius:28}}>
        <Text style={{fontSize:18}}>{this.props.message}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
});