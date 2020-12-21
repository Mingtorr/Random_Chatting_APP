/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ReactNative from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import {
    StyleSheet, 
    Text,
    View,
    TextInput, 
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    Switch,
    UselessTextInput,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { windowHidth, windowHeight } = Dimensions.get("window");
const keyboardVerticalOffset = Platform.OS === 'ios' ? 150 : 0
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
    _scrollToInput = (reactNode) => {
        this.scroll.props.scrollToFocusedInput(reactNode)
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
                <KeyboardAvoidingView style={styles.matching_tab_bg} behavior='padding'  keyboardVerticalOffset={keyboardVerticalOffset}>
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
                        <View style={{display:'flex',flex:0.6,zIndex:999}}>
                            <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'10%',marginRight:'10%'}}>
                            <RNPickerSelect
                            
                            style={{inputAndroid:{justifyContent: 'center',
                            textAlign: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            placeholderColor: '#ababa',
                            borderRadius:20,
                            borderWidth: 0.5,
                            fontWeight:'bold',fontFamily:"Jalnan",
                            color: '#ababa',},inputIOS:{justifyContent: 'center',
                            textAlign: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            placeholderColor: '#ababa',
                            borderWidth: 0.5,
                            borderRadius:20,
                            fontWeight:'bold',fontFamily:"Jalnan",
                            color: '#ababa',}}}
                            placeholder={
                                {
                                // label: '학과선택',
                                // value: null,
                                }
                            }
                            onValueChange={(value) => this.setState({major: value})}
                            items={[
                                {label: '학번을 선택해주세요.', value: 'nothing'},
                                {label: '21학번', value: 'computer engineering'},
                                {label: '20학번', value: 'baseball'},
                                {label: '19학번', value: 'hockey'},
                                {label: '18학번', value: 'hockey'},
                                {label: '17학번', value: 'hockey'},
                            ]}
                            />
                            </View>
                        </View>
                    </View>
                    <View style={{display:'flex',flex:0.5}}>
                            <View style={{display:'flex',flex:0.3,justifyContent:'center',marginLeft:40}}>
                            <Text style={{fontSize:18,fontWeight:'bold',fontFamily:"Jalnan"}}>메세지</Text>
                            </View>
                            
                            <View style={{display:'flex',flex:0.6,width:'80%',marginLeft:'10%'}}>
                                <TextInput
                                style={{ height: '100%', borderColor: 'gray', borderWidth: 1 ,padding:10}}
                                multiline={true}
                                numberOfLines={4}
                                />
                            </View>
                           
                    </View>
                </View>
                <View style={{display:'flex',flex:0.1}}>

                </View>
                </KeyboardAvoidingView>
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