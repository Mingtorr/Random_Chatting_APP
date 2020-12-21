/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
    FlatList,
    Image,
    Modal,
    Keyboard,
    Dimensions} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';

import Groupmatch_main from '../groupmatch/groupmatch';
import Womangroup from '../groupmatch/womangroup';
import Mangroup from '../groupmatch/mangroup';
import Creatgroup from '../groupmatch/creategroup';

const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

const arr = [
    {key:1,title:'우리오늘... 만나자',nickname:'어린콩개발자',body:'오늘밤에 같이놀 남자3명 구합니다~',people:3,time:'15:04',sex:'f'},
    {key:2,title:'우리오늘... 만나자',nickname:'정휘제',body:'저는 오도 해병입니다',people:3,time:'15:08',sex:'m'},
    {key:3,title:'우리오늘... 만나자',nickname:'허원영',body:'헬스같이할 여자 3명',people:3,time:'13:04',sex:'f'},
    {key:4,title:'우리오늘... 만나자',nickname:'윤혁',body:'젤라리또!',people:3,time:'12:44',sex:'m'},
    {key:5,title:'우리오늘... 만나자',nickname:'어린콩개발자',body:'오늘밤에 같이놀 남자3명 구합니다~',people:3,time:'15:04',sex:'f'},
    {key:6,title:'우리오늘... 만나자',nickname:'정휘제',body:'저는 오도 해병입니다',people:3,time:'15:08',sex:'m'},
    {key:7,title:'우리오늘... 만나자',nickname:'허원영',body:'헬스같이할 여자 3명',people:3,time:'13:04',sex:'f'},
    {key:8,title:'우리오늘... 만나자',nickname:'윤혁',body:'젤라리또!',people:3,time:'12:44',sex:'m'},
]

export default class Group_match extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }
    openmodal=()=>{
        this.setState({
            visible:true
        })
    }
    closemodal=()=>{
        this.setState({
            visible:false
        })
    }
      render(){          
        return(
            <SafeAreaView style = {styles.matching_tab_bg}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.visible}>
                    <Creatgroup closemodal={this.closemodal}/>
                </Modal>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{display:'flex', justifyContent:'flex-end',flexDirection:'row'}}>
                        <TouchableOpacity onPress={this.openmodal} 
                        style={{position: 'absolute',zIndex: 9999, top: Height*0.70, left: Width*0.80,
                                backgroundColor:'#a1bdff', borderRadius: 35, width:50, height: 50, alignItems: "center", justifyContent: "center"}}>
                            <Image style={{width:30,height:30}} source={require('../groupmatch/add.png')}/>
                        </TouchableOpacity>
                    </View>

                   <View style={{display:'flex', backgroundColor:'white'}}>
                        <FlatList
                        style={{display:"flex",flexDirection:"column"}}
                        keyExtractor={item => item.key.toString()}
                        data={arr}//여기서
                        renderItem={({item,index}) => {
                            if(item.sex==='f'){
                                return(
                                    <Womangroup title={item.title} nickname={item.nickname} body={item.body} time={item.time}/>
                                )
                            }else{
                                return(
                                    <Mangroup title={item.title} nickname={item.nickname} body={item.body} time={item.time}/>
                                 )
                            }
                        }}
                        />
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