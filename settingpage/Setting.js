import React, { Component } from 'react'
import { Text, View, SafeAreaView, Button, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
export default class Setting extends Component {
    state = {
        alert : true,
        receptionnum : '00',
    };
    alerton =()=>{
        this.setState({
            alert : true
        })
    }
    alertoff =()=>{
        this.setState({
            alert : false
        })
    }
    render() {
        return (
            <SafeAreaView style = {styles.setting_safe}>
                <View style ={styles.setting_inf}>
                    <View style = {{backgroundColor : 'darkgray', width : '50%', height : '70%', borderRadius : 30}}>
                        <Text>이미지 들어갈 곳</Text>
                    </View>
                    <View>
                        <Text style ={{fontFamily : 'Jalnan', color : 'red'}}>ID</Text>
                        <Text style ={{fontFamily : 'Jalnan'}}>Cexmachine</Text>
                        <Text style ={{fontFamily : 'Jalnan', color : 'red'}}>별 명</Text>
                        <Text style ={{fontFamily : 'Jalnan'}}>허원영왕고추참치</Text>
                        <Button title = '회원탈퇴'/>
                    </View>
                </View>
                <View style={styles.setting_btn}>
                    <Text style = {{fontFamily : 'Jalnan', marginRight : 50}}>알림</Text>
                    {this.state.alert ? (
                    <View style={styles.setting_btn2}>
                        <Button title = "on" />
                        <Button title = "off" onPress={this.alertoff} color='gray' />
                    </View>
                    ):
                    (
                    <View style={styles.setting_btn2}>
                        <Button title = "on" onPress={this.alerton} color='gray'/>
                        <Button title = "off" />
                    </View>
                    )}
                    
                </View>
                <View style = {styles.setting_recept}>
                    <Text style = {{fontFamily : 'Jalnan'}}>
                        수신 갯수
                    </Text>
                    <Picker
                    selectedValue={this.state.receptionnum}
                    style={{ height: 50, width: 150, marginLeft : 50}}
                    onValueChange={(itemValue, itemIndex) => this.setState({receptionnum : itemValue})}
                    >
                        <Picker.Item label="무한대" value="00" />
                        <Picker.Item label="40개" value="40" />
                        <Picker.Item label="35개" value="35" />
                        <Picker.Item label="30개" value="30" />
                        <Picker.Item label="25개" value="25" />
                        <Picker.Item label="20개" value="20" />
                    </Picker>
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    setting_safe:{
        display:"flex",
        backgroundColor:'#c7d9ff',
        flex:1,
        flexDirection:"column",
        justifyContent : "center",
        alignItems : "center"
    },
    setting_inf :{
        display :"flex",
        justifyContent : 'space-evenly',
        alignItems : 'center',
        // alignSelf :"center",
        marginTop : 80,
        marginBottom : 30,
        backgroundColor : 'white',
        height : '30%',
        width : '92%',
        padding : 20,
        borderRadius : 30,
        flexDirection :"row"
    },
    setting_btn :{
        display : "flex",
        width : '80%',
        height : 50,
        flexDirection : "row",
        // justifyContent : "space-evenly",
        alignItems : "center",
        // borderBottomColor : 'gray',
        // borderBottomWidth : 1
    },
    setting_btn2 :{
        display :"flex",
        flexDirection : "row"
    },
    setting_recept :{
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        // justifyContent :'space-evenly',
        width : '80%'
    }
    
})