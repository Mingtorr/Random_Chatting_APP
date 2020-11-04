import React, { Component } from 'react'
import { Text, View, SafeAreaView, Button, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
export default class Setting extends Component {
    state = {
        alert : true,
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
                    <Text>회원정보</Text>
                </View>
                <View style={styles.setting_btn}>
                    <Text>알림</Text>
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
                <View>
                    <Text>
                        수신 갯수 : 
                    </Text>
                    <RNPickerSelect
                    style = {{marginBottom : "30", color : "red"}}
                    placeholder ={{
                        label : '수신 갯수',
                        value : '',
                    }}

                    onValueChange={(value) => console.log(value)}
                    items={[
                    { label: '40', value: '40' },
                    { label: '35', value: '35' },
                    { label: '30', value: '30' },
                    { label: '25', value: '25' },
                    { label: '20', value: '20' },
                    ]}
                    />
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    setting_safe:{
        display:"flex",
        // backgroundColor :'black',
        backgroundColor:'#c7d9ff',
        flex:1,
        flexDirection:"column",
    },
    setting_inf :{
        display :"flex",
        alignSelf :"center",
        marginTop : 80,
        marginBottom : 30,
        backgroundColor : 'white',
        height : 200,
        width : 350,
        padding : 20,
        borderRadius : 30,
        flexDirection :"row"
    },
    setting_btn :{
        display : "flex",
        width : 200,
        flexDirection : "row",
        justifyContent : "space-evenly",
        alignItems : "center"
    },
    setting_btn2 :{
        display :"flex",
        flexDirection : "row"
    }
    
})