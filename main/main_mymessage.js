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

export default class Main_Mymessage extends React.Component{
    render(){
        return(
            <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', marginBottom:5, marginTop:5}}>
                <View style={{display:'flex', justifyContent:'flex-end', marginRight:10}}>
                    <Text style={{fontSize:12}}>{this.props.time}</Text>
                </View>
                <View style={{display:'flex', backgroundColor:'#eaeaea', marginRight:16, maxWidth:'70%', 
                paddingLeft:20, paddingRight:20, paddingBottom:10, paddingTop:10, borderRadius:28}}>
                    <Text style={{fontSize:18}}>{this.props.message}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   
});