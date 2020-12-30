import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
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
import CheckBox from 'react-native-check-box';
import io from "socket.io-client";
import LinearGradient from 'react-native-linear-gradient';

const func = require('../server/api');

const socket = io(func.api(3004,''));

export default class FriendInbox extends React.Component {
  
  constructor(props){
    super(props);
    const today = new Date();

    this.state = {
      user_Info: '',
      messagesRoom:[],
      ids: [],
      day: today.getDate(),
      year: today.getFullYear(),
    };

    const year = today.getFullYear(); // 년도
    const month = today.getMonth() + 1;  // 월
    const date = today.getDate();  // 날짜
    const hour = today.getHours();
    const min = today.getMinutes();
    
  }
  componentWillMount(){
    console.log("시발년들ㅇ");
    socket.on('recieve_messageroom',(data)=>{
      console.log('소켓', data);
      console.log(this.state.messagesRoom);
      // this.state.messagesRoom.map((v,i,a)=>{
      //   if(v.room_id === data.roomid){
      //     this.state.messagesRoom[i].message_body = data.message 
      //   }
      // })
      const room = [...this.state.messagesRoom];
      this.setState({
        messagesRoom: room.map(
          info => data.roomid === info.room_id
          ? {...info, message_body: data.message}
          : info
        ),
      })
    })

    socket.on('recieve_ChatNum', (data)=>{
      console.log('쳇 넘', JSON.stringify(data));
      const room = [...this.state.messagesRoom];
      this.setState({
        messagesRoom: room.map(
          info => data.roomid === info.room_id
          ? {...info, count: data.count}
          : info
        ),
      })
    })

    AsyncStorage.getItem('login_user_info',(err, result)=>{
      const info = JSON.parse(result)
      this.setState({
        user_Info: info,
      })
      const key ={
        userKey: this.state.user_Info.user_key
      }
      socket.emit('messageroomjoin',this.state.user_Info.user_key);
      fetch(func.api(3002,'GetMessageRoom'),{
        method: 'post',
        headers:{
          'content-type': 'application/json',
        },
        body:JSON.stringify(key),
      }).then((res) => res.json())
        .then((json) =>{
          console.log('fetch안에 내용', this.state.user_Info.user_key);
          json.map((row) =>{
            console.log("row:" + JSON.stringify(row));
            const newtime = new Date(row.message_time);
            let year = newtime.getFullYear();
            let month = newtime.getMonth()+1;
            let day = newtime.getDate();
            let hour = newtime.getHours();
            let min = newtime.getMinutes();
            // console.log(month+ '월 ' + day+ '일 ' + hour+':'+min);
            // console.log('시간: '+ hour);
            // console.log('분: ' + min);
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
              messagesRoom:[...this.state.messagesRoom, newrow]
            })
            // console.log("room", this.state.messagesRoom);
          })

        }).catch((err) => console.log("err: ", err))
    })
  }

  componentDidMount(){

  }

  isChecked = (itemId) => {
    const isThere = this.state.ids.includes(itemId);

    return isThere;
  };

  toggleChecked = (itemId) => {
    const ids = [...this.state.ids, itemId];

    if (this.isChecked(itemId)) {
      this.setState({
        ...this.state,
        ids: this.state.ids.filter((id) => id !== itemId),
      });
    } else {
      this.setState({
        ...this.state,
        ids,
      });
    }
  };
  
  deleteRoom = (itemId) => {
    const data = [...this.state.messagesRoom]
    this.setState({
      messagesRoom: data.filter(info => info.room_id !== itemId)
    })
    const room_del ={
      room_id: itemId,
      user_key: this.state.user_Info.user_key
    }

    fetch(func.api(3002,'DelMessageRoom'),{
      method: 'post',
      headers:{
        'content-type': 'application/json',
      },
      body:JSON.stringify(room_del),
    }).then((res) => res.json())
      .then((json) => {
        if (json){
          alert(itemId+"삭제되었습니다.")
        }
      })

    console.log('Delete '+ itemId);
  }

  longPressAlert = (itemId) =>{
    Alert.alert("방을 나가시겠습니까?",
    "상대방이 슬퍼할지도 몰라요.",
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

  onpress = (itemId,itemId2) =>{
    const data = [...this.state.messagesRoom];
    //클릭시 새로운 메시지 표시 삭제
    this.setState({
      messagesRoom: data.map(
        info => itemId === info.room_id
          ? {...info, count: 0}
          : info
      )
    })
    const room_chat ={
      room_id : itemId,
      user_key : this.state.user_Info.user_key
    }

    fetch(func.api(3002,'ChatNumZero'),{
      method: 'post',
      headers:{
        'content-type': 'application/json',
      },
      body:JSON.stringify(room_chat),
    })

    this.props.go.navigate('Message',{roomid: itemId,touser: itemId2})
  }

  deleteChek = () =>{
    let data = [...this.state.messagesRoom]
    
    this.state.ids.map((itemId) =>{
      data = data.filter(num => num.id !== itemId)
    })
    this.setState({
      messagesRoom: data
    })
    console.log(data);
  }



  renderItem = ({item}) =>{
    return (
      <SafeAreaView style = {styles.container}>
        <TouchableOpacity onLongPress = {() => this.longPressAlert(item.room_id)} onPress = {() => this.onpress(item.room_id,item.user_key)}>
          <View style={styles.messageElem}>

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={item.user_sex ==='0' ? ['#8ac3dc', '#63a7eb'] :['#eb6c63', '#e94e68']}
              style={styles.linearGradient}
              style = {[item.user_sex === '0' ? styles.profileMale: styles.profileFemale]}>
            </LinearGradient>

            <View style={styles.messageInfo}>
              <View style ={styles.messageHead}>
                <Text style={styles.nickName}>{item.user_nickname}</Text>
              </View>
              <View style = {styles.messageLastChat}>
                <Text style = {styles.lastChat}>{item.message_body}</Text>
              </View>
            </View>
            {
              this.props.outButtonBool ?
              <View style = {styles.messageTime}>
                <ShowDate item ={item} year = {this.state.year} day = {this.state.day}/>
                  {item.count > 0 ?
                    <View style = {styles.newChat}>
                      {item.count <300
                        ?<Text style = {styles.isNewchat}>{item.count}</Text>
                        :<Text style = {styles.isNewchat}>+300</Text>} 
                    </View> : <View/>
                  }
              </View>
              :<CheckBox
                style={{flex: 1, marginLeft: 40}}
                onClick ={() => this.toggleChecked(item.id)}
                isChecked={this.isChecked(item.id)}
              />
            }
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
  render(){
    
    return (
      <SafeAreaView style={styles.container}>
        {/* <Button title = '나가기' onPress = {this.deleteChek}></Button> */}
        <FlatList
          data={this.state.messagesRoom}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.room_id)}
        />
      </SafeAreaView>
  )}
}

function ShowDate(props) {
  if(props.year =! props.item.year){
    return(
      <View>
        <Text style = {styles.timeFont}>{props.item.year}-{props.item.month}-{props.item.day}</Text>
      </View>
    )
  }else if(props.day-1 == props.item.day){
    return(
      <View>
        <Text style = {styles.timeFont}>어제</Text>
      </View>
    )
  }else if(props.day != props.item.day){
    return(
      <View>
        <Text style = {styles.timeFont}>{props.item.year}-{props.item.month}-{props.item.day}   </Text>
      </View>
    )
  }else{
    return(
      <View>
        <Text style = {styles.timeFont}>{props.item.ampm} {props.item.hour}:{props.item.min}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  containerNew:{
    display:'flex',
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ffdfd9'
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
    fontSize:18,
  },
  lastChat:{
    color: 'gray',
  },
  messageTime:{
    display:'flex',
    flex:1.2,
    justifyContent:'flex-end',
    alignItems:'flex-end', 
    // backgroundColor: 'blue',
    height: 30
  },
  timeFont:{
    display:'flex',
    fontSize: 10,
    color: 'gray',
  },
  profileMale:{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  profileFemale:{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f29b8a',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 10,
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
  },
  isNewBack:{
    backgroundColor: '#f29b8a'
  }
})
