/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
  Image,
  UselessTextInput,
  FlatList,
  Dimensions,
  Keyboard,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import Group_req from './group_req';
let imagePath = require('./llama.png');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
console.log(Width + 'asdasd');
console.log(Height + 'asdxzz');
const Item = ({title}) => (
  <View style={{display: 'flex', backgroundColor: 'green', flex: 1}}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = ({item}) => (
  <View
    style={{
      display: 'flex',
      width: '100%',
      height: 100,
      borderBottomWidth: 2,
      borderColor: '#e9ecef',
      flexDirection: 'column',
      marginTop: 10,
      paddingTop: 20,
      shadowColor: '#000000',
      shadowOpacity: 0.1,
    }}>
    <View style={{display: 'flex', flexDirection: 'row', shadowOpacity: 0}}>
      <View style={{width: '70%'}}>
        {/* 3/3 */}
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              marginLeft: 30,
              fontSize: 14,
              fontWeight: 'bold',
              fontFamily: 'Jalnan',
              color: 'gray',
            }}>
            5/30
          </Text>
        </View>

        {/* 창원 존잘 */}
        <View style={{marginTop: 7, marginLeft: 30}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            창원 존잘남이에용 사랑해요~
          </Text>
        </View>
      </View>
      <View style={{width: '30%'}}>
        {/* 이미지 */}

        <Image
          style={{height: 50, width: 50, marginLeft: '30%', marginTop: -5}}
          source={imagePath}
        />
        <Text style={{marginLeft: '31%', marginTop: 5, marginBottom: 5}}>
          참여하기
        </Text>
      </View>
    </View>
    {/* <View style={{display:'flex',flex:0.56,flexDirection:'row'}}>
            
            <View style={{display:'flex',flex:0.3,justifyContent:'center'}}>
                <View style={{width:80,height:30,backgroundColor:'red',borderRadius:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:14,color:'white',fontWeight:'bold',fontFamily:"Jalnan"}}>신청하기</Text>
                </View>
            </View>
        </View> */}
  </View>
);
export default class Group_match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTF: 'none',
    };
  }

  openmodal = (e) => {
    if (this.state.modalTF == 'none') {
      this.setState({
        modalTF: 'flex',
      });
      this.props.shadow();
    } else {
      this.setState({
        modalTF: 'none',
      });
      this.props.shadow();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.matching_tab_bg}>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            marginLeft: '5%',
            marginTop: '15%',
            display: this.state.modalTF,
          }}>
          <Group_req />
        </View>

        <View
          style={{
            position: 'absolute',
            zIndex: 900,
            top: Height * 0.6,
            left: Width * 0.8,
          }}>
          <TouchableOpacity
            onPress={this.openmodal}
            style={{
              backgroundColor: '#F29b8a',
              borderRadius: 35,
              width: 55,
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('./bb.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  matching_tab_bg: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
});
