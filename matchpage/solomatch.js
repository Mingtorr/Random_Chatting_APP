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
    UselessTextInput,
    Keyboard} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';

export default class Solo_match extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            class: "",
            major: "전공",
            isEnabled:false,
            country: 'uk'
        }
    }
    toggleSwitch=()=>{
        if(this.state.isEnabled === true){
          this.setState({
            isEnabled:false
          })
        }else{
          this.setState({
            isEnabled:true
          })
        }
      }
    render(){
        let radio_props = [     //radio button
            {label: '남    ', value: 0 },
            {label: '여', value: 1 }
        ];
          
        return(
            <SafeAreaView style = {styles.matching_tab_bg}>
                <View style={{display:'flex',flex:0.2}}>

                </View>
                <View style={{display:'flex',flex:0.7}}>
                    <View style={{display:'flex',flex:0.25,flexDirection:'row'}}>
                        <View style={{display:'flex',flex:0.7,justifyContent:'center',marginLeft:40}}>
                        <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>이성에게 보내기</Text>
                        </View>
                        <View style={{display:'flex',flex:0.3,justifyContent:'center'}}>
                            <Switch
                            trackColor={{ false: "white", true: "red" }}
                            thumbColor={this.state.isEnabled ? "white" : "white"}
                            ios_backgroundColor="#white"
                            onValueChange={this.toggleSwitch}
                            value={this.state.isEnabled}
                            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                            />
                        </View>
                    </View>
                    <View style={{display:'flex',flex:0.25,flexDirection:'row'}}>
                        <View style={{display:'flex',flex:0.7,justifyContent:'center',marginLeft:40}}>
                            <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>같은 학과</Text>
                        </View>
                        <View style={{display:'flex',flex:0.3,justifyContent:'center'}}>
                            <Switch
                            trackColor={{ false: "white", true: "red" }}
                            thumbColor={this.state.isEnabled ? "white" : "white"}
                            ios_backgroundColor="#white"
                            onValueChange={this.toggleSwitch}
                            value={this.state.isEnabled}
                            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                            />
                        </View>
                    </View>
                    <View style={{display:'flex',flex:0.25}}>
                        <View style={{display:'flex',flex:0.4,marginLeft:40}}>
                            <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>학번</Text>
                        </View>
                        <View style={{display:'flex',flex:0.6}}>
                            <DropDownPicker
                                items={[
                                    {label: '21학번', value: 'usa'},
                                    {label: '20학번', value: 'usa'},
                                    {label: '19학번', value: 'uk' },
                                    {label: '18학번', value: 'france'},
                                    {label: '17학번', value: 'usa'},
                                    {label: '16학번', value: 'uk' },
                                    {label: '15학번', value: 'france'},
                                ]}
                                defaultValue={this.state.country}
                                containerStyle={{height: 40}}
                                style={{backgroundColor: '#fafafa',display:'flex',width:"80%",marginLeft:'9%',marginTop:10}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({
                                    country: item.value
                                })}
                            />
                        </View>
                    </View>
                    <View style={{display:'flex',flex:0.5}}>
                            <View style={{display:'flex',flex:0.3,justifyContent:'center',marginLeft:40}}>
                            <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>메세지</Text>
                            </View>
                            <View style={{display:'flex',flex:0.6,width:'80%',marginLeft:'10%'}}>
                                <TextInput
                                style={{ height: '100%', borderColor: 'gray', borderWidth: 1 }}
                                multiline={true}
                                numberOfLines={4}
                                />
                            </View>
                    </View>
                </View>
                <View style={{display:'flex',flex:0.1}}>

                </View>
                <View style={{display:'flex',flex:0.1,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan",color:'white'}}>메세지 보내기</Text>
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