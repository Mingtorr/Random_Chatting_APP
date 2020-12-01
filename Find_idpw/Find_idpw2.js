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
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image,
    SafeAreaView,
    Alert, 
    Keyboard} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';


class Find_idpw2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pw1: "",
            pw2: "",
            pw1_check: false,
            pw2_check: false,

            button_color: "gray",
            change_check: false
        };
    }

    backBtn = (e) => {
        e.preventDefault();
        this.props.navigation.navigate('Find_idpw')
    };

    input_pw1 = (e) => {
        this.setState({
            pw1: e,
            pw1_check: true
        });
        
        this.change_button_active()
    }
    input_pw2 = (e) => {
        this.setState({
            pw2: e,
            pw2_check: true
        });

        this.change_button_active()
    }

    change_button_active = () => {
        if(this.state.pw1_check && this.state.pw2_check){
            this.setState({
                button_color: "#f05052",
                change_check: true
            })
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.idpw2_bg}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.idpw2_content}>
                    <TouchableOpacity onPress={this.backBtn}>
                    <View style={{marginTop: 20, left:'5%'}}>
                        <Image 
                        style={{width:25, height:25}}
                        source={require('./cancel.png')} />
                    </View>
                    </TouchableOpacity>
                    
                    <View style={styles.idpw2_1}>
                        <Text style={styles.Intro_idpw1}>와글 와글</Text>
                        <Text style={styles.Intro_idpw2}>ID/PW 찾기</Text>
                    </View>

                    <View>
                        <Text style={styles.Text_idpw_text}>비밀번호</Text>
                        <View style={styles.idpw2_2}>
                            <View style={styles.Text_idpw}>
                                <TextInput style={styles.Text_idpw_input} value={this.state.pw1} onChangeText={this.input_pw1}/>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.Text_idpw_text}>비밀번호 확인</Text>
                        <View style={styles.idpw2_3}>
                            <View style={styles.Text_idpw}>
                                <TextInput style={styles.Text_idpw_input} value={this.state.pw2} onChangeText={this.input_pw2}/>
                            </View>
                        </View>
                    </View>
                    <View style={{height: "20%"}}></View>

                    <View style={styles.idpw2_4}>
                        <TouchableOpacity 
                            style={{
                            width: "100%",
                            alignItems: "center",
                            backgroundColor: this.state.button_color,
                            paddingTop: 10,
                            paddingBottom: 10}} onPress={this.change_alert} activeOpacity={this.state.change_check ? 0.5 : 1}>
                            <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}}>변경</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
      }
    }
    
    const styles = StyleSheet.create({
        idpw2_bg:{
            display: "flex",
            backgroundColor: "white"
        },

        idpw2_content:{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
        },

        idpw2_1:{
            alignItems: "center",
        },
        idpw2_2:{
            alignItems: "center"
        },
        idpw2_3:{
            alignItems: "center"
        },
        idpw2_4:{
            alignItems: "center",
            marginBottom: 10
        },


        Intro_idpw1:{
            fontSize: 15,
            color: "#f05052",
            fontFamily: "Jalnan"
        },
        Intro_idpw2:{
            fontSize: 30,
            color: "#f05052",
            fontFamily: "Jalnan"
        },

        Text_idpw:{
            display:"flex",
            flexDirection:'row',
            width:'90%',
            borderBottomWidth: 1,
            borderBottomColor: 'gray'
        },
        Text_idpw_text:{
            fontFamily: 'Jalnan',
            fontSize: 15,
            color: '#f05052',
            marginLeft: 20
        },
    
        Text_idpw_input:{
            display: "flex",
            color: 'black',
            flex: 0.9,
            height: 25,
            fontSize: 20,
            marginLeft: 10,
            padding: 0
        },

        Btn_idpw:{
        }
    });

export default withNavigation(Find_idpw2);