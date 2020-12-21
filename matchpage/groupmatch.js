/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {
    StyleSheet, 
    Text,
    View,
    TextInput, 
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Switch,
    Image,
    UselessTextInput,
    FlatList,
    Dimensions,
    Keyboard} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
console.log(Width+"asdasd");
console.log(Height+"asdxzz");
const Item = ({ title }) => (
    <View style={{display:'flex',backgroundColor:'green',flex:1}}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <View style={{display:'flex',width:'100%',height:80,borderBottomWidth:1,borderColor:'gray',flexDirection:'column',marginTop:10}}>
        <View style={{display:'flex',flex:0.45,flexDirection:'row'}}>
            <View style={{display:'flex',flex:0.8,justifyContent:'center'}}>
            <Text style={{marginLeft:40,fontSize:14,fontWeight:'bold',fontFamily:"Jalnan"}}>3/3</Text>
            </View>
            <View style={{display:'flex',flex:0.2,justifyContent:'center'}}>
            <Text style={{marginLeft:40,fontSize:14,fontWeight:'bold',fontFamily:"Jalnan"}}>2m</Text>
            </View>
        </View>
        <View style={{display:'flex',flex:0.56,flexDirection:'row'}}>
            <View style={{display:'flex',flex:0.7,justifyContent:'center'}}>
                <Text style={{marginLeft:40,fontSize:15,fontWeight:'bold'}}>창원 존잘남이에용 사랑해요~</Text>
            </View>
            <View style={{display:'flex',flex:0.3,justifyContent:'center'}}>
                <View style={{width:80,height:30,backgroundColor:'red',borderRadius:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:14,color:'white',fontWeight:'bold',fontFamily:"Jalnan"}}>신청하기</Text>
                </View>
            </View>
        </View>
    </View>
  );
export default class Group_match extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render(){
          
        return(
            <SafeAreaView style = {styles.matching_tab_bg}>
                <View style={{position: 'absolute',zIndex: 9999, top: Height*0.60, left: Width*0.80}}>
                        <TouchableOpacity onPress={this.openmodal} 
                        style={{
                                backgroundColor:'#a1bdff', borderRadius: 35, width:50, height: 50, alignItems: "center", justifyContent: "center"}}>
                            <Image style={{width:30,height:30}} source={require('../groupmatch/add.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{display:'flex',flex:1,backgroundColor:'white'}}>
                    <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    />
                    </View>
            </SafeAreaView>
        )
      }
    }

const styles = StyleSheet.create({
    matching_tab_bg:{
        display: "flex",
        flex: 1,
        backgroundColor: "white"
    }
})