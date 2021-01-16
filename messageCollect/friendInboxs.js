import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

export default class FriendsInbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      DATA: [
        {
          id: '1',
          sex: 'F',
          type: '2', // 몇 대 몇 과팅인지
          nickName: '과팅1호',
          lastChat: '어디서 만나요?',
          ampm: '오후',
          hour: '12',
          min: '30',
          messagetime: '12:30',
          isNewChat: false,
          isNewChatNum: 2,
        },
        {
          id: '2',
          sex: 'F',
          type: '2', // 몇 대 몇 과팅인지
          nickName: '과팅1호',
          lastChat: '어디서 만나요?',
          ampm: '오후',
          hour: '12',
          min: '30',
          messagetime: '12:30',
          isNewChat: false,
          isNewChatNum: 2,
        },
      ],
    };
  }

  deleteRoom = (itemId) => {
    const data = [...this.state.DATA];
    this.setState({
      DATA: data.filter((info) => info.id !== itemId),
    });
    console.log('Delete ' + itemId);
    // alert(itemId + '삭제되었습니다.');
  };

  longPressAlert = (itemId) => {
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

  onpress = (itemId) => {
    this.props.go.navigate('Groupmessage');
    const data = [...this.state.DATA];
    //클릭시 새로운 메시지 표시 삭제
    this.setState({
      DATA: data.map((info) =>
        itemId === info.id ? {...info, isNewChatNum: 0} : info,
      ),
    });
    // alert(itemId + '클릭' + data[itemId - 1].isNewChatNum);
  };

  renderItem = ({item}) => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onLongPress={() => this.longPressAlert(item.id)}
          onPress={() => this.onpress(item.id)}>
          <View style={styles.messageElem}>
            <View style={styles.typeProfile}>
              <Text style={styles.typeFont}>{item.type}명</Text>
            </View>
            <View style={styles.messageInfo}>
              <View style={styles.messageHead}>
                <Text style={styles.nickName}>{item.nickName}</Text>
              </View>
              <View style={styles.messageLastChat}>
                <Text style={styles.lastChat}>{item.lastChat}</Text>
              </View>
            </View>
            <View style={styles.messageTime}>
              <Text style={styles.timeFont}>
                {item.ampm} {item.messagetime}
              </Text>
              {item.isNewChatNum > 0 ? (
                <View style={styles.newChat}>
                  {item.isNewChatNum < 300 ? (
                    <Text style={styles.isNewchat}>{item.isNewChatNum}</Text>
                  ) : (
                    <Text style={styles.isNewchat}>+300</Text>
                  )}
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.DATA}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.id)}
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
    fontSize: 20,
  },
  lastChat: {
    color: 'gray',
  },
  messageTime: {
    display: 'flex',
    flex: 1.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 30,
  },
  timeFont: {
    display: 'flex',
    fontSize: 10,
    color: 'gray',
  },
  typeProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#c7d9ff',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeFont: {
    fontSize: 15,
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
});
