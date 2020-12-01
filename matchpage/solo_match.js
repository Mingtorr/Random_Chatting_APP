/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet, 
    Text,
    View,
    TextInput, 
    TouchableOpacity,
    SafeAreaView,
    Alert,
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
        }
    }

    render(){
        let radio_props = [     //radio button
            {label: '남    ', value: 0 },
            {label: '여', value: 1 }
        ];
          
        return(
            <SafeAreaView style = {styles.matching_tab_bg}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                    <Text>상대방에게 보낼 메세지 입력</Text>
                    </View>

                    <View>
                    <TextInput style={{borderColor: 'black', borderWidth:1}} multiline={true}/>
                    </View>

                    <View>
                        <Text>성별</Text>
                        <RadioForm
                            buttonColor={'#f05052'}
                            labelColor={'black'}
                            formHorizontal={true}
                            buttonSize={10}
                            radio_props={radio_props}
                            // buttonWrapStyle={{marginLeft: 10, marginRight: 10}}
                            borderWidth={0.5}
                            
                            initial={0}
                            onPress={(value) => {this.setState({value:value})}}
                        />
                    </View>

                    <View>
                        <Text>학번</Text>
                        <RNPickerSelect
                        style={{marginBottom:"30", color:"red"}}
                            placeholder={{
                        }}
                            onValueChange={(value) => this.setState({class: value})}
                                items={[
                                { label: '20', value: 'class_20' },
                                { label: '19', value: 'class_19' },
                                { label: '18', value: 'class_18' },
                                { label: '17', value: 'class_17' },
                                { label: '16', value: 'class_16' },
                                { label: '15', value: 'class_15' },
                                { label: '14', value: 'class_14' },
                                { label: '13', value: 'class_13' },
                                { label: '12', value: 'class_12' },
                                { label: '11', value: 'class_11' },
                                ]}
                        />
                    </View>

                    <View>
                        <Text>학과</Text>
                        <RNPickerSelect
                        style={{marginBottom:"30", color:"red"}}
                            placeholder={{
                        }}
                            onValueChange={(value) => this.setState({major: value})}
                                items={[
                                { label: '컴퓨터공학과', value: 'major_1' },
                                { label: '정보통신공학과', value: 'major_2' },
                                { label: '화학공학과', value: 'major_3' },
                                { label: '전자공학과', value: 'major_4' },
                                { label: '전기공학과', value: 'major_5' },
                                ]}
                        />
                    </View>
                    
                    <View style={{height: "15%"}}></View>

                    <View>
                        <TouchableOpacity style={{
                                width: "100%",
                                alignItems: "center",
                                backgroundColor: "#f05052",
                                paddingTop: 10,
                                paddingBottom: 10,}}>
                            <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}}>전송</Text>
                        </TouchableOpacity>
                    </View>

                </TouchableWithoutFeedback>
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