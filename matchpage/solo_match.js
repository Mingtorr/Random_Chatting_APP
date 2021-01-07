import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';

export default class Solo_match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: '',
      major: '전공',
    };
  }

  render() {
    let radio_props = [
      //radio button
      {label: '남    ', value: 0},
      {label: '여', value: 1},
    ];

    return (
      <SafeAreaView style={styles.matching_tab_bg}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text>상대방에게 보낼 메세지 입력</Text>
          </View>

          <View>
            <TextInput
              style={{borderColor: 'black', borderWidth: 1}}
              multiline={true}
            />
          </View>

          <View>
            <Text>성별</Text>
            <RadioForm
              buttonColor={'#f05052'}
              labelColor={'black'}
              formHorizontal={true}
              buttonSize={10}
              radio_props={radio_props}
              // buttonWrapStyle={{marginLeft: 10, marginRight: 10}}
              borderWidth={0.5}
              initial={0}
              onPress={(value) => {
                this.setState({value: value});
              }}
            />
          </View>

          <View>
            <Text>학번</Text>
            <RNPickerSelect
              style={{marginBottom: '30', color: 'red'}}
              placeholder={{}}
              onValueChange={(value) => this.setState({class: value})}
              items={[
                {label: '20', value: 'class_20'},
                {label: '19', value: 'class_19'},
                {label: '18', value: 'class_18'},
                {label: '17', value: 'class_17'},
                {label: '16', value: 'class_16'},
                {label: '15', value: 'class_15'},
                {label: '14', value: 'class_14'},
                {label: '13', value: 'class_13'},
                {label: '12', value: 'class_12'},
                {label: '11', value: 'class_11'},
              ]}
            />
          </View>

          <View>
            <Text>학과</Text>
            <RNPickerSelect
              style={{marginBottom: '30', color: 'red'}}
              placeholder={{}}
              onValueChange={(value) => this.setState({major: value})}
              items={[
                {label: '학과를 선택해주세요.', value: ''},
                {label: '국어국문학과', value: '국어국문학과'},
                {label: '독어독문학과', value: '독어독문학과'},
                {label: '일어일문학과', value: '일어일문학과'},
                {label: '철학과', value: '철학과'},
                {label: '유아교육과', value: '유아교육과'},
                {label: '영어영문학과', value: '영어영문학과'},
                {label: '불어불문학과', value: '불어불문학과'},
                {label: '사학과', value: '사학과'},
                {label: '특수교육과', value: '특수교육과'},
                {label: '법학과', value: '법학과'},
                {label: '국제관계학과', value: '국제관계학과'},
                {label: '사회학과', value: '사회학과'},
                {label: '가족복지학과', value: '가족복지학과'},
                {label: '행정학과', value: '행정학과'},
                {label: '중국학과', value: '중국학과'},
                {label: '신문방송학과', value: '신문방송학과'},
                {label: '글로벌비즈니스학부', value: '글로벌비즈니스학부'},
                {label: '경영학과', value: '경영학과'},
                {label: '세무학과', value: '세무학과'},
                {label: '국제무역학과', value: '국제무역학과'},
                {label: '회계학과', value: '회계학과'},
                {label: '수학과', value: '수학과'},
                {label: '생물학화학융합학부', value: '생물학화학융합학부'},
                {label: '생명보건학부', value: '생명보건학부'},
                {label: '식품영양학과', value: '식품영양학과'},
                {label: '체육학과', value: '체육학과'},
                {label: '물리학과', value: '물리학과'},
                {label: '통계학과', value: '통계학과'},
                {label: '의류학과', value: '의류학과'},
                {label: '간호학과', value: '간호학과'},
                {label: '산업시스템공학과', value: '산업시스템공학과'},
                {
                  label: '토목환경화공융합공학부',
                  value: '토목환경화공융합공학부',
                },
                {label: '화공시스템공학과', value: '화공시스템공학과'},
                {label: '건축공학부', value: '건축공학부'},
                {label: '컴퓨터공학과', value: '컴퓨터공학과'},
                {label: '조선해양공학과', value: '조선해양공학과'},
                {label: '환경공학과', value: '환경공학과'},
                {label: '토목공학과', value: '토목공학과'},
                {label: '건축공학전공', value: '건축공학전공'},
                {label: '정보통신공학과', value: '정보통신공학과'},
              ]}
            />
          </View>

          <View style={{height: '15%'}}></View>

          <View>
            <TouchableOpacity
              style={{
                width: '100%',
                alignItems: 'center',
                backgroundColor: '#f05052',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Text
                style={{color: 'white', fontFamily: 'Jalnan', fontSize: 20}}>
                전송
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
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
