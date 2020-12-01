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


class Find_idpw extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input_email: "",
            input_confirm: "",

            button_color1: "gray",
            use1: false,

            button_color2: "gray",
            use2: false,

            button_color3: "gray",
            use3: false
        };
    }

    backBtn = (e) => {
        e.preventDefault();
        this.props.navigation.navigate('Login')
    };

    email_text = (e) => {
        this.setState({
            input_email: e
        });

        if(this.state.input_email !== ""){
            this.setState({
                button_color1: "#f05052",
                use1: true,
            });
        }
        else{
            this.setState({
                button_color1: "gray",
                use1: false,
            });
        }

        this.nextbutton_active()
    }

    confirm_text = (e) => {
        this.setState({
            input_confirm: e
        });

        if(this.state.input_confirm !== ""){
            this.setState({
                button_color2: "#f05052",
                use2: true,
            });
        }
        else{
            this.setState({
                button_color2: "gray",
                use2: false,
            });
        }

        this.nextbutton_active()
    }
    
    nextbutton_active = () => {
        if(this.state.use1 && this.state.use2){
            this.setState({
                button_color3: "#f05052",
                use3: true
            })
        }
        else{
            this.setState({
                button_color3: "gray",
                use3: false
            })
        }
    }

    nextBtn = (e) => {
        if(this.state.use3){
            e.preventDefault();
            this.props.navigation.navigate('Find_idpw2')
        }
    };

    render(){
        
        return(
            <SafeAreaView style={styles.idpw_bg}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.idpw_content}>
                    <TouchableOpacity onPress={this.backBtn}>
                    <View style={{marginTop: 20, left:'5%'}}>
                        <Image 
                        style={{width:25, height:25}}
                        source={require('./cancel.png')} />
                    </View>
                    </TouchableOpacity>
                    
                    <View style={styles.idpw_1}>
                        <Text style={styles.Intro_idpw1}>와글 와글</Text>
                        <Text style={styles.Intro_idpw2}>ID/PW 찾기</Text>
                    </View>

                    <View style={styles.idpw_2}>
                        <Text style={styles.Intro_idpw4}>사용자 이메일을 입력하시면 해당 이메일로</Text>
                        <Text style={styles.Intro_idpw4}>인증번호를 보내드립니다.</Text>
                    </View>

                    <View>
                        <Text style={styles.Text_idpw_text}>Email</Text>
                        <View style={styles.idpw_3}>
                            <View style={styles.Text_idpw}>
                                <TextInput style={styles.Text_idpw_input} value={this.state.input_email} onChangeText={this.email_text}/>
                                <Text style={{color:'gray', fontWeight:"bold", fontSize:15, marginRight: 10}}>@changwon.ac.kr</Text>
                                <TouchableOpacity style={{
                                    borderWidth:0,
                                    color:'white',
                                    borderRadius:60,
                                    fontFamily:'Jalnan',
                                    paddingLeft:10,
                                    paddingTop:5,
                                    paddingRight:10,
                                    paddingBottom:5,
                                    fontSize:20,
                                    backgroundColor: this.state.button_color1,
                                    elevation:8,
                                    marginBottom:5,
                                    marginTop:-4}} onPress={this.email_alert} activeOpacity={this.state.use1 ? 0.5 : 1}>
                                    <Text style={{color:'white', fontFamily:'Jalnan'}}>전송</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.Text_idpw_text}>인증번호</Text>
                        <View style={styles.idpw_4}>
                            <View style={styles.Text_idpw}>
                                <TextInput style={styles.Text_idpw_input} value={this.state.input_confirm} onChangeText={this.confirm_text}/>
                                <TouchableOpacity style={{
                                    borderWidth:0,
                                    color:'white',
                                    borderRadius:60,
                                    fontFamily:'Jalnan',
                                    paddingLeft:10,
                                    paddingTop:5,
                                    paddingRight:10,
                                    paddingBottom:5,
                                    fontSize:20,
                                    backgroundColor: this.state.button_color2,                                    
                                    elevation:8,
                                    marginBottom:5,
                                    marginRight:-15,
                                    marginTop:-4}} onPress={this.confirm_alert} activeOpacity={this.state.use2 ? 0.5 : 1}>
                                    <Text style={{color:'white', fontFamily:'Jalnan'}}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{height: "15%"}}></View>

                    <View style={styles.idpw_5}>
                        <TouchableOpacity style={{
                                width: "100%",
                                alignItems: "center",
                                backgroundColor: this.state.button_color3,
                                paddingTop: 10,
                                paddingBottom: 10,}} onPress={this.nextBtn} activeOpacity={this.state.use3 ? 0.5 : 1}>
                            <Text style={{color:'white',fontFamily:'Jalnan',fontSize:20}}>다음</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
      }
    }
    
    const styles = StyleSheet.create({
        idpw_bg:{
            display: "flex",
            backgroundColor: "white"
        },

        idpw_content:{
            display: "flex",
            height: "100%",
            justifyContent: "space-between",
        },

        idpw_1:{
            alignItems: "center",
        },
        idpw_2:{
            marginTop: -10,
            alignItems: "center"
        },
        idpw_3:{
            alignItems: "center"
        },
        idpw_4:{
            alignItems: "center"
        },
        idpw_5:{
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
        Intro_idpw4:{
            fontWeight: "bold"
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


        Btn_confirm1:{
        },
        Btn_confirm2:{
        },

        Btn_idpw:{
        }
    });

export default withNavigation(Find_idpw);