import AsyncStorage from '@react-native-community/async-storage';
import React,{useState} from 'react';
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
  Alert,
} from 'react-native';
import io from "socket.io-client";
import ShowTimeFun from './ShowTimeFun'
const func = require('../server/api');
const timefunc = require('../message/timefunction');

const socket = io(func.api(3004,''));

export default class Grouproom extends React.Component {
  constructor(props){
    super(props);
    const today = new Date();
    this.state = {
      user_Info: '',
      grouproom: [],
      ids: [],
      day: today.getDate(),
      year: today.getFullYear(),
    }
  }
  componentDidMount(){
    console.log('그룹');

    AsyncStorage.getItem('login_user_info',(err, result)=>{
      const info = JSON.parse(result)
      this.setState({
        user_Info: info,
      })
      const key ={
        userKey: this.state.user_Info.user_key
      }
      // socket.emit('messageroomjoin',this.state.user_Info.user_key);
      fetch(func.api(3002,'Get_Group'),{
        method: 'post',
        headers:{
          'content-type': 'application/json',
        },
        body:JSON.stringify(key),
      }).then((res) => res.json())
        .then((json) =>{
          console.log('구룹fetch안에 내용', this.state.user_Info.user_key);
          json.map((row) =>{
            //넘어오는 데이터 예시
            // group_key: 2,
            // user_key: [ 2, 3 ],
            // count: 0,
            // group_title: ,
            // group_date: ,
            // group_message_body: ,
            // group_message_time: 
            console.log("row:" + JSON.stringify(row));
            const newtime = new Date(row.group_message_time);
            let year = newtime.getFullYear();
            let month = newtime.getMonth()+1;
            let day = newtime.getDate();
            let hour = newtime.getHours();
            let min = newtime.getMinutes();

            const newrow = row;
            newrow.year = year;
            if (hour > 12){
              newrow.ampm = '오후'
              newrow.hour = hour - 12;
            }else{
              newrow.ampm = '오전'
              newrow.hour = hour;
            }
            newrow.month = month;
            newrow.day = day;
            newrow.min = min;
            console.log("new"+JSON.stringify(newrow));

            this.setState({
              grouproom:[...this.state.grouproom, newrow]
            })
            // console.log("room", this.state.messagesRoom);
          })

        }).catch((err) => console.log("err: ", err))
    })

  }

  deleteRoom = (itemId) => {
    const data = [...this.state.grouproom]

    const DelGroup ={
      group_key: itemId,
      userkey : this.state.user_Info.user_key
    }
    console.log('그룹삭제', DelGroup);
    
    fetch(func.api(3002, 'DelGroupRoom'),{
      method: 'post',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(DelGroup)
    })

    this.setState({
      grouproom: data.filter(info => info.group_key !== itemId)
    })
  }

  longPressAlert = (itemId) =>{
    Alert.alert("방을 나가시겠습니까?",
    "진짜로 나가겠습니까?",
    [
      {
        text: "아니요",
        style: "cancel"
      },
      {text: "네", onPress: () => this.deleteRoom(itemId)}, // 화살표 함수로 바인딩 대체
    ],
    {cancelable: false}
    );
  }

  onpress = (itemId) =>{
    this.props.go.navigate('Groupmessage');
    const data = [...this.state.grouproom];
    //클릭시 새로운 메시지 표시 삭제
    this.setState({
      DATA: data.map(
        info => itemId === info.group_key
          ? {...info, count: 0}
          : info
      )
    })
  }

  renderItem = ({item}) =>{
    return (
      <SafeAreaView style ={styles.container}>
        <TouchableOpacity onLongPress = {() => this.longPressAlert(item.group_key)}  onPress = {() => this.onpress(item.group_key)}>
          <View style={styles.messageElem}>
            <View style = {styles.typeProfile}>
              {/* <Text style = {styles.typeFont}>{item.type}명</Text> */}
            </View>
            <View style={styles.messageInfo}>
              <View style ={styles.messageHead}>
                <Text style={styles.nickName}>{item.group_title}</Text>
              </View>
              <View style = {styles.messageLastChat}>
                <Text style = {styles.lastChat}>{item.group_message_body}</Text>
              </View>
            </View>
            <View style = {styles.messageTime}>
              <ShowTimeFun item ={item} year = {this.state.year} day = {this.state.day}/>
              {/* <Text style={styles.timeFont}>{item.ampm} {item.messagetime}</Text> */}
              {item.count > 0 ?
                <View style = {styles.newChat}>
                {item.count <300
                  ?<Text style = {styles.isNewchat}>{item.count}</Text>
                  :<Text style = {styles.isNewchat}>+300</Text>} 
                </View> : <View/>
              }
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
  
  render(){ 
    return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.grouproom}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.group_key)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  messageElem:{
    display:'flex',
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    borderColor:'#eee',
    borderBottomWidth:0.5,
    padding: 5,
  },
  messageInfo:{
    display:'flex',
    flexDirection: 'column',
    justifyContent: "space-between",
    flex:5,
  },
  messageHead:{
  },
  nickName: {
    fontSize:20,
  },
  lastChat:{
    color: 'gray',
  },
  messageTime:{
    display:'flex',
    flex:1.2,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    height: 30
  },
  timeFont:{
    display:'flex',
    fontSize: 10,
    color: 'gray',
  },
  typeProfile:{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#c7d9ff',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  typeFont:{
    fontSize: 15,
  },
  newChat:{
    flexDirection:'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 5,
    marginBottom:5,
    marginLeft: 5,
    height: 16,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingLeft: 4,
    paddingRight: 4
  },
  isNewchat:{
    fontWeight: 'bold',
    fontSize: 12,
    color: "white"
  }

})