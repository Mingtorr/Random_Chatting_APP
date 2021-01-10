import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  Button,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {withNavigation} from 'react-navigation';

class Set_alarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: true,
      receptionnum: '00',
      isEnabled: true,
      isEnabled_two: true,
    };
  }
  toggleSwitch = () => {
    this.setState({
      isEnabled: !this.state.isEnabled,
    });
  };
  toggleSwitch_two = () => {
    this.setState({
      isEnabled_two: !this.state.isEnabled_two,
    });
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
            <Image
              style={{width: 25, height: 25}}
              source={require('./cancel.png')}
            />
          </TouchableOpacity>
          <View style={styles.Head_alarm}>
            <Text>Setting</Text>
            <Text>알람 설정</Text>
          </View>
        </View>
        {/* 메세지 알람 */}
        <View style={styles.Msg_alarm}>
          <Text style={styles.Textmsg_alarm}>메세지 알림</Text>
          <Switch
            trackColor={{false: '#767577', true: '#f05052'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
            thumbColor={this.state.isEnabled ? 'white' : '#f4f3f4'}
          />
        </View>
        {/* 공지알람 */}
        <View style={styles.Msg_alarm}>
          <Text style={styles.Textmsg_alarm}>공지 알림</Text>
          <Switch
            trackColor={{false: '#767577', true: '#f05052'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch_two}
            value={this.state.isEnabled_two}
            thumbColor={this.state.isEnabled_two ? 'white' : '#f4f3f4'}
          />
        </View>
        {/* 메세지 수신거부 */}
        <View style={styles.Msg_alarm}>
          <Text style={styles.Textmsg_alarm}>메세지 수신 갯수</Text>
          <View style={{width: 150}}>
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
        {/* 기존 */}
        {/* <View style={styles.set_alarm_btn}>
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
        </View> */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Container_alarm: {
    display: 'flex',
    backgroundColor:'white',
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
    position: 'absolute',
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
  Msg_alarm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 10,
    paddingRight: 10,
    ...Platform.select({
      ios: {
        marginTop: 15,
      },
      android: {
        marginTop: 10,
      },
    }),
  },
  Textmsg_alarm: {
    fontFamily: 'Jalnan',
    fontSize: 15,
    color: 'black',
    // color: '#f05052',
    marginLeft: '10%',
  },
});

export default withNavigation(Set_alarm);
