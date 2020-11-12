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

export default class FriendInbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      DATA : [
        {
          id: 1,
          sex: "M",
          nickName: "남자7호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        {
          id: 2,
          sex: "M",
          nickName: "남자2호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        {
          id: 3,
          sex: "F",
          nickName: "여자1호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        {
          id: 4,
          sex: "F",
          nickName: "여자1호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        {
          id: 5,
          sex: "F",
          nickName: "여자1호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        
        {
          id: 6,
          sex: "F",
          nickName: "여자1호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        
        {
          id: 7,
          sex: "F",
          nickName: "여자1호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        
        {
          id: 8,
          sex: "F",
          nickName: "여자4호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
        {
          id: 9,
          sex: "F",
          nickName: "여자5호",
          lastChat: "어디서 만나요?",
          ampm: "오후",
          hour: "12",
          min: "30",
          messagetime: "12:30",
          isNewChat: false,
          isNewChatNum: 2,
        },
      ],
      ids: [],
    };
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
  
  deleteRoom = () => {
    alert("삭제되었습니다.")
  }

  longPressAlert = () =>{
    Alert.alert("방을 나가시겠습니까?",
    "상대방이 슬퍼할지도 몰라요.",
    [
      {
        text: "아니요",
        style: "cancel"
      },
      {text: "네", onPress: deleteRoom},
    ],
    {cancelable: false}
    );
  }

  onpress = () =>{
    alert("테스트");
  }

  renderItem = ({item}) =>{
    return (
      <SafeAreaView style ={styles.container}>
        <TouchableOpacity onLongPress = {this.longPressAlert} onPress = {this.onpress}>
          <View style={styles.messageElem}>
            <View style = {[item.sex === 'M' ? styles.profileMale: styles.profileFemale]}></View>
            <View style={styles.messageInfo}>
              <View style ={styles.messageHead}>
                <Text style={styles.nickName}>{item.nickName}</Text>
              </View>
              <View style = {styles.messageLastChat}>
                <Text style = {styles.lastChat}>{item.lastChat}</Text>
              </View>
            </View>
            <View style = {styles.messageTime}>
              {this.props.outButtonBool ? <Text style = {styles.timeFont}>{item.ampm} {item.messagetime}</Text>
              :<CheckBox
              style={{flex: 1, padding: 10}}
              onClick ={() => this.toggleChecked(item.id)}
              isChecked={this.isChecked(item.id)}
            /> }
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.DATA}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </SafeAreaView>
  )}
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
  },
  timeFont:{
    display:'flex',
    fontSize: 12,
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
    backgroundColor: 'pink',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 10,
  },
})