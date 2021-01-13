import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import CheckBox from 'react-native-check-box';
import io from 'socket.io-client';
import LinearGradient from 'react-native-linear-gradient';
import ShowTimeFun from './ShowTimeFun';
import Modal from "react-native-modal";
import {Dimensions} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
const func = require('../server/api');
const timefunc = require('../message/timefunction');

const socket = io(func.api(3005, ''));

export default class FriendInbox extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();

    this.state = {
      user_Info: '',
      messagesRoom: [],
      ids: [],
      day: today.getDate(),
      year: today.getFullYear(),
      // modalVisible: false,
    };
  }
  componentDidMount() {
    socket.on('recieve_messageroom', (data) => {
      const newtime = new Date(data.time2);

      let hour = newtime.getHours();
      let min = newtime.getMinutes();
      let ampm;

      if (hour > 12) {
        ampm = '오후';
        hour = hour - 12;
      } else {
        ampm = '오전';
        hour = hour;
      }

      const room = [...this.state.messagesRoom];
      this.setState({
        messagesRoom: room.map((info) =>
          data.roomid === info.room_id
            ? {
                ...info,
                message_body: data.message,
                ampm: ampm,
                hour: hour,
                min: min,
              }
            : info,
        ),
      });
    });
    socket.on('receptionrecieve',(data)=>{
      const room = [...this.state.messagesRoom];
      this.setState({
        messagesRoom: room.map((info) =>
          data.roomid === info.room_id ? {...info, toreception: data.reception} : info,
        ),
      });
    })
    socket.on('recieve_ChatNum', (data) => {
      const room = [...this.state.messagesRoom];
      this.setState({
        messagesRoom: room.map((info) =>
          data.roomid === info.room_id ? {...info, count: data.count} : info,
        ),
      });
    });
    socket.on('roomshownickname', (data) => {
      const room = [...this.state.messagesRoom];
      this.setState({
        messagesRoom: room.map((info) =>
          data.roomid === info.room_id ? {...info, shownickname: 1} : info,
        ),
      });
    });
    AsyncStorage.getItem('login_user_info', (err, result) => {
      const info = JSON.parse(result);
      this.setState({
        user_Info: info,
      });
      const key = {
        userKey: this.state.user_Info.user_key,
      };
      socket.emit('messageroomjoin', this.state.user_Info.user_key);
      fetch(func.api(3003, 'GetMessageRoom'), {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(key),
      })
        .then((res) => res.json())
        .then((json) => {
          json.map((row) => {
            const newtime = new Date(row.message_time);
            let year = newtime.getFullYear();
            let month = newtime.getMonth() + 1;
            let day = newtime.getDate();
            let hour = newtime.getHours();
            let min = newtime.getMinutes();
            const newrow = row;
            newrow.year = year;
            newrow.modalVisible = false;
            if (hour > 12) {
              newrow.ampm = '오후';
              newrow.hour = hour - 12;
            } else {
              newrow.ampm = '오전';
              newrow.hour = hour;
            }
            newrow.month = month;
            newrow.day = day;
            newrow.min = min;
            console.log('new' + JSON.stringify(newrow));

              this.setState({
                messagesRoom: [...this.state.messagesRoom, newrow],
              });
              // console.log("room", this.state.messagesRoom);
            });
        }).catch((err) => console.log('err: ', err));
      })
    }

  isChecked = (itemId) => {
    const isThere = this.state.ids.includes(itemId);

    return isThere;
  };

  setModalVisible = (bool, room_id) =>{
    const data = [...this.state.messagesRoom]
    this.setState({
      messagesRoom: data.map((info) =>
        room_id === info.room_id ? {...info, modalVisible: bool} : info,
      ),
    })
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
    const realtime = timefunc.settime();
    const data = [...this.state.messagesRoom];
    const realtime2 = new Date();
    const room_del = {
      roomid: itemId,
      userkey: this.state.user_Info.user_key,
      touserkey: '',
      time: realtime,
      time2: realtime2,
      message: 'delcode5010',
      name: '',
    };

    data.map((value, indax) => {
      if (value.room_id === itemId) {
        room_del.touserkey = value.user_key;
        room_del.name = value.user_nickname;
      }
    });

    socket.emit('singleRoomDel', room_del);

    this.setState({
      messagesRoom: data.filter((info) => info.room_id !== itemId),
    });
  };
  // 모달 추가로 사용안함//////////////
  longPressAlert = (itemId) => {
    const key = {
      key: 1,
    };

    Alert.alert(
      '방을 나가시겠습니까?',
      '상대방이 슬퍼할지도 몰라요.',
      [
        {
          text: '아니요',
          style: 'cancel',
        },
        {text: '네', onPress: () => this.deleteRoom(itemId)}, // 화살표 함수로 바인딩 대체
      ],
      {cancelable: false},
    );
  };

  onpress = (itemId, itemId2, toshownickname, tousertoken, toreception) => {
    const data = [...this.state.messagesRoom];
    //클릭시 새로운 메시지 표시 삭제
    this.setState({
      messagesRoom: data.map((info) =>
        itemId === info.room_id ? {...info, count: 0} : info,
      ),
    });
    const room_chat = {
      room_id: itemId,
      user_key: this.state.user_Info.user_key,
    };
    console.log(tousertoken);
    fetch(func.api(3003, 'ChatNumZero'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(room_chat),
    });
    fetch(func.api(3003, 'getshownickname'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(room_chat),
    })
      .then((res) => res.json())
      .then((json) => {
        this.props.go.navigate('Message', {
          roomid: itemId,
          touser: itemId2,
          myshownickname: json.shownickname,
          toshownickname: toshownickname,
          tousertoken: tousertoken,
          reception: toreception, // 1: 수신동의 0:수신거부
        });
      });
  };

  deleteChek = () => {
    let data = [...this.state.messagesRoom];

    this.state.ids.map((itemId) => {
      data = data.filter((num) => num.id !== itemId);
    });
    this.setState({
      messagesRoom: data,
    });
    console.log(data);
  };

  receptionOnOff = (roomid, reception, touserkey) =>{
    const data = [...this.state.messagesRoom];
    //클릭시 새로운 메시지 표시 삭제
    const userkey ={
      userkey: this.state.user_Info.user_key,
      roomid: roomid,
      reception : null,
    }
    if(reception===1){ //알람 켜진상태
      this.setState({
        messagesRoom: data.map((info) =>
          roomid === info.room_id ? {...info, reception: 0} : info,
        ),
      });
      socket.emit('reception',({roomid : roomid, reception:0, touserkey:touserkey}))
      userkey.reception = 0;
    } else{
      this.setState({
        messagesRoom: data.map((info) =>
          roomid === info.room_id ? {...info, reception: 1} : info,
        ),
      });
      socket.emit('reception',({roomid : roomid, reception:1, touserkey:touserkey}))
      userkey.reception =1;
    }
    
    fetch(func.api(3003, 'receptionOnOff'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userkey),
    }).then((res) => res.json())
    .then((json) =>{
      if(json){
        alert('알람이 설정되었습니다.')
        this.setModalVisible(false, roomid)
      }else{
        console.log('알람꺼짐 버그');
      }
    })
  }

  renderItem = ({item}) => {
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={item.modalVisible}
          onRequestClose={() => { this.setModalVisible(false, item.room_id) } }
        >
          
          <TouchableWithoutFeedback style={styles.centeredView} onPress={() => {this.setModalVisible(false, item.room_id)}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style ={styles.modalTitle}>방 설정</Text>
                
                <TouchableOpacity style = {styles.modalTouch} 
                  onPress= {() => {this.receptionOnOff(item.room_id, item.reception , item.user_key)}}>
                  {item.reception === 1
                  ?(<Text style = {styles.modalText}>채팅방 알림 끄기</Text>)
                    :(<Text style = {styles.modalText}>채팅방 알림 켜기</Text>)
                  }
                </TouchableOpacity>

                <TouchableOpacity style = {styles.modalTouch} onPress = {() => this.longPressAlert(item.room_id)}>
                  <Text style = {styles.modalText}>나가기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity
          // onLongPress={() => this.longPressAlert(item.room_id)}
          onLongPress={() => this.setModalVisible(true, item.room_id)}
          onPress={() =>
            this.onpress(item.room_id, item.user_key, item.shownickname, item.user_token, item.toreception)
          }>
          <View style={styles.messageElem}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={
                item.user_sex === '0'
                  ? ['#8ac3dc', '#63a7eb']
                  : ['#eb6c63', '#e94e68']
              }
              style={styles.linearGradient}
              style={[
                item.user_sex === '0'
                  ? styles.profileMale
                  : styles.profileFemale,
              ]}></LinearGradient>

            <View style={styles.messageInfo}>
              <View style={styles.messageHead}>
                {item.shownickname === 0 ? (
                  <Text style={styles.nickName2}>
                    답장을 기다리고 있습니다.
                  </Text>
                ) : (
                  <Text style={styles.nickName}>{item.user_nickname}</Text>
                )}
                {item.reception ===1 // 1켜기 0 끄기
                ? <Text>동의</Text>
                : <Text>거부</Text>}
              </View>
              <View style={styles.messageLastChat}>
                {item.message_body === 'delcode5010' ? (
                  <Text style={styles.lastChat}>상대방이 나갔습니다.</Text>
                ) : (
                  // <Text>{item.message_body}</Text>
                  <Text style={styles.lastChat}>
                    {item.message_body.length > 35
                      ? item.message_body.substr(0, 37).padEnd(40, '.')
                      : item.message_body}
                  </Text>
                  // <View/>
                )}
              </View>
            </View>
            {this.props.outButtonBool ? (
              <View style={styles.messageTime}>
                <ShowTimeFun
                  item={item}
                  year={this.state.year}
                  day={this.state.day}
                />
                {item.count > 0 ? (
                  <View style={styles.newChat}>
                    {item.count < 300 ? (
                      <Text style={styles.isNewchat}>{item.count}</Text>
                    ) : (
                      <Text style={styles.isNewchat}>+300</Text>
                    )}
                  </View>
                ) : (
                  <View />
                )}
              </View>
            ) : (
              <CheckBox
                style={{flex: 1, marginLeft: 40}}
                onClick={() => this.toggleChecked(item.id)}
                isChecked={this.isChecked(item.id)}
              />
            )}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Button title = '나가기' onPress = {this.deleteChek}></Button> */}
        <FlatList
          data={this.state.messagesRoom}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.room_id)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  containerNew: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffdfd9',
  },
  messageElem: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderBottomWidth: 0.5,
    padding: 5,
  },
  messageInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 5,
  },
  messageHead: {},
  nickName: {
    fontSize: 18,
  },
  nickName2: {
    fontSize: 18,
    color: '#f7b2b2',
  },
  lastChat: {
    color: 'gray',
  },
  messageTime: {
    display: 'flex',
    flex: 1.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
    height: 30,
  },
  timeFont: {
    display: 'flex',
    fontSize: 12,
    color: 'gray',
  },
  profileMale: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  profileFemale: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f29b8a',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  newChat: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    height: 16,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingLeft: 4,
    paddingRight: 4,
  },
  isNewchat: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  isNewBack: {
    backgroundColor: '#f29b8a',
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor:'red'
  },
  modalView: {
    // flex: 0.5,
    height: chartHeight*0.2,
    width: chartWidth*0.6,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingLeft: 30,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTitle:{
    fontSize:18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  modalTouch: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalText:{
    fontSize: 16,
  }
});
