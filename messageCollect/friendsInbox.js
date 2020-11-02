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

import Modal from 'react-native-modal';

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

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deleteRoom = () =>{
    alert("삭제되었습니다.")
    toggleModal()
  }

  const renderItem = ({item}) =>{
    return (
      <SafeAreaView style ={styles.container}>
        <TouchableOpacity onLongPress = {toggleModal}>
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
        <View style ={styles.modalContainer}>
          <Modal isVisible ={isModalVisible}
            backdropOpacity = {0.1}
            onBackdropPress = {toggleModal}>
            <View style = {styles.StyledModalContainer}>
              <Text style = {styles.modalTitle}>방을 나가시겠습니까?</Text>
              <Text style = {styles.modalContent}>상대방이 슬퍼할지도 몰라요.{"\n"}
                다시 생각해보세요 ㅠㅠ
              </Text>
              <TouchableOpacity onPress = {deleteRoom}>
                <Text style = {styles.modalButton}>나가기</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
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
  },
  modalContainer:{
    display:'flex',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  StyledModalContainer:{
    display:'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    marginLeft: '8%',
    width: 310,
    height: 210,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10
  },
  modalTitle:{
    marginTop:20,
    fontSize: 24,
    marginLeft: 20,
  },
  modalContent:{
    marginTop:20,
    marginLeft: 20,
    fontSize:18,
    color: 'gray',
  },
  modalButton:{
    marginTop: 30,
    marginLeft: 20,
    fontSize:15,
    color: "#f05052",
    fontWeight:'bold'
  }

})