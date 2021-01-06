import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
export default class Set_alarm extends Component {
  state = {
    alert: true,
    receptionnum: '00',
  };
  alerton = () => {
    this.setState({
      alert: true,
    });
  };
  alertoff = () => {
    this.setState({
      alert: false,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.Conainer_alarm}>
        <View style={styles.Header_alarm}>
          <TouchableOpacity
            style={styles.back_alarm}
            onPress={() => this.props.navigation.goBack()}>
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.Head_alarm}>
            <Text>Setting</Text>
            <Text>알람 설정</Text>
          </View>
        </View>
        <View style={styles.set_alarm_btn}>
          <Text style={{fontFamily: 'Jalnan', marginRight: 50}}>알림</Text>
          {this.state.alert ? (
            <View style={styles.set_alarm_btn2}>
              <Button title="on" />
              <Button title="off" onPress={this.alertoff} color="gray" />
            </View>
          ) : (
            <View style={styles.set_alarm_btn2}>
              <Button title="on" onPress={this.alerton} color="gray" />
              <Button title="off" />
            </View>
          )}
        </View>
        <View style={styles.set_alarm_btn}>
          <Text style={{fontFamily: 'Jalnan', marginRight: 50}}>수신 갯수</Text>
          <View style={{width: 200}}>
            <RNPickerSelect
              style={{marginBottom: '30', color: 'red'}}
              placeholder={{}}
              // placeholder={{
              //   // label: '수신갯수',
              //   // value: '00',
              // }}
              onValueChange={(value) => this.setState({receptionnum: value})}
              items={[
                {label: '무한대', value: '00'},
                {label: '40개', value: '40'},
                {label: '35개', value: '35'},
                {label: '30개', value: '30'},
                {label: '25개', value: '25'},
                {label: '20개', value: '20'},
              ]}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Container_alarm: {
    display: 'flex',
  },
  Header_alarm: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  back_alarm: {
    marginLeft: 30,
  },
  Head_alarm: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  set_alarm_btn: {
    alignSelf: 'center',
    display: 'flex',
    height: 50,
    width: '50%',
    flexDirection: 'row',
    // marginLeft: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderBottomColor : 'gray',
    // borderBottomWidth : 1
  },
  set_alarm_btn2: {
    display: 'flex',
    flexDirection: 'row',
  },
});