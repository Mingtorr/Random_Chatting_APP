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
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginBottom:5,marginTop:5}}>
                <View style={{backgroundColor:'white',display:'flex',justifyContent:'flex-end',marginRight:10}}>
                            <Text style={{fontSize:12}}>{this.props.time}</Text>
                </View>
                <View style={{display:'flex',backgroundColor:'#eb6c63',marginRight:16,maxWidth:'70%',paddingLeft:15,paddingRight:15,paddingBottom:8,paddingTop:8,borderRadius:20}}>
                    <Text style={{fontSize:18,color:'white'}}>{this.props.message}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
});