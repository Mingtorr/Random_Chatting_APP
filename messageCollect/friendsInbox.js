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
  Alert,
} from 'react-native';

export default function App() {
  const DATA = [
    {
      id: "1",
      sex: "F",
      type: "2", // 몇 대 몇 과팅인지
      nickName: "과팅1호",
      lastChat: "어디서 만나요?",
      ampm: "오후",
      hour: "12",
      min: "30",
      messagetime: "12:30",
      isNewChat: false,
      isNewChatNum: 2,
    },
    {
      id: "2",
      sex: "F",
      type: "2", // 몇 대 몇 과팅인지
      nickName: "과팅1호",
      lastChat: "어디서 만나요?",
      ampm: "오후",
      hour: "12",
      min: "30",
      messagetime: "12:30",
      isNewChat: false,
      isNewChatNum: 2,
    },
  ]

  const onpress =() => {
    alert("테스트");
  }

  const renderItem = ({item}) =>{
    return (
      <View style ={styles.container}>
        <TouchableOpacity onPress = {onpress}>
          <View style={styles.messageElem}>
            <View style = {styles.typeProfile}>
              <Text style = {styles.typeFont}>{item.type}명</Text>
            </View>
            <View style={styles.messageInfo}>
              <View style ={styles.messageHead}>
                <Text style={styles.nickName}>{item.nickName}</Text>
              </View>
              <View style = {styles.messageLastChat}>
                <Text style = {styles.lastChat}>{item.lastChat}</Text>
              </View>
            </View>
            <View style = {styles.messageTime}>
              <Text style={styles.timeFont}>{item.ampm} {item.messagetime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
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
  }

})