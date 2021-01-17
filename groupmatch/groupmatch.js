import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import Womangroup from './womangroup';
import Mangroup from './mangroup';
import Creatgroup from './creategroup';
const arr = [
  {
    key: 1,
    title: '우리오늘... 만나자',
    nickname: '어린콩개발자',
    body: '오늘밤에 같이놀 남자3명 구합니다~',
    people: 3,
    time: '15:04',
    sex: 'f',
  },
  {
    key: 2,
    title: '우리오늘... 만나자',
    nickname: '정휘제',
    body: '저는 오도 해병입니다',
    people: 3,
    time: '15:08',
    sex: 'm',
  },
  {
    key: 3,
    title: '우리오늘... 만나자',
    nickname: '허원영',
    body: '헬스같이할 여자 3명',
    people: 3,
    time: '13:04',
    sex: 'f',
  },
  {
    key: 4,
    title: '우리오늘... 만나자',
    nickname: '윤혁',
    body: '젤라리또!',
    people: 3,
    time: '12:44',
    sex: 'm',
  },
  {
    key: 5,
    title: '우리오늘... 만나자',
    nickname: '어린콩개발자',
    body: '오늘밤에 같이놀 남자3명 구합니다~',
    people: 3,
    time: '15:04',
    sex: 'f',
  },
  {
    key: 6,
    title: '우리오늘... 만나자',
    nickname: '정휘제',
    body: '저는 오도 해병입니다',
    people: 3,
    time: '15:08',
    sex: 'm',
  },
  {
    key: 7,
    title: '우리오늘... 만나자',
    nickname: '허원영',
    body: '헬스같이할 여자 3명',
    people: 3,
    time: '13:04',
    sex: 'f',
  },
  {
    key: 8,
    title: '우리오늘... 만나자',
    nickname: '윤혁',
    body: '젤라리또!',
    people: 3,
    time: '12:44',
    sex: 'm',
  },
];

export default class Groupmatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  openmodal = () => {
    this.setState({
      visible: true,
    });
  };
  closemodal = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}>
          <Creatgroup closemodal={this.closemodal} />
        </Modal>
        <SafeAreaView
          style={{
            display: 'flex',
            backgroundColor: 'a1bdff',
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#a1bdff',
              flex: 0.06,
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 0.62,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{fontFamily: 'Jalnan', color: 'white', fontSize: 20}}>
                과팅게시판
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flex: 0.3,
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={this.openmodal}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('./add.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{display: 'flex', flex: 0.94, backgroundColor: 'white'}}>
            <FlatList
              style={{display: 'flex', flexDirection: 'column'}}
              keyExtractor={(item) => item.key.toString()}
              data={arr} //여기서
              renderItem={({item, index}) => {
                if (item.sex === 'f') {
                  return (
                    <Womangroup
                      title={item.title}
                      nickname={item.nickname}
                      body={item.body}
                      time={item.time}
                    />
                  );
                } else {
                  return (
                    <Mangroup
                      title={item.title}
                      nickname={item.nickname}
                      body={item.body}
                      time={item.time}
                    />
                  );
                }
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
