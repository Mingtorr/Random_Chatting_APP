import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './login/login';
import Signup from './sign_up/sign_up';
import Signup2 from './sign_up/sign_up2';
import Signup3 from './sign_up/sign_up3';
import Main from './main/Main';
import Match_page from './matchpage/match_page';
import Message from './message/message';
import Find_idpw from './Find_idpw/Find_idpw';
import Find_idpw2 from './Find_idpw/Find_idpw2';
import Splash from './splash/Splash';
import Setmain from './settingpage/set_main/Set_main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MessageCollect from './messageCollect/messageCollect';
import Set_privacy from './settingpage/set_privacy/Set_privacy';
import Set_alarm from './settingpage/set_alarm/Set_alarm';
import Set_notice from './settingpage/set_notice/Set_notice';
import Singo from './message/singo';
import {fcmService} from './push/FCMService';
import {localNotificationService} from './push/LocalNotificationService';
import AsyncStorage from '@react-native-community/async-storage';
import Groupmessage from './groupmessage/groupmessage';
import messaging from '@react-native-firebase/messaging';
import Set_exit from './settingpage/set_exit/exit';
const func = require('./server/api');
import {Image} from 'react-native';
import FriendInbox from './messageCollect/friendInbox';
import Noticepush from './settingpage/set_notice/noticepush';
import ChangePW from './sign_up/changePW';

const Stack = createStackNavigator();
export default class App extends React.Component {
  state = {
    isLoading: false,
    isLogin: false,
    fisrt_name: 'Login',
    fisrt_components: Login,
    second_name: 'Main',
    second_components: Bottom,
  };

  componentDidMount = async () => {
    let bool = false;
    await AsyncStorage.getItem('login_onoff_set', (err, result) => {
      if (result !== null) {
        this.setState({
          fisrt_name: 'Main',
          fisrt_components: Bottom,
          second_name: 'Login',
          second_components: Login,
        });
        bool = true;
      }
    });
    if (bool === true) {
      const token = await messaging().getToken();
      let userkey;
      AsyncStorage.getItem('login_user_info', (err, result) => {
        userkey = JSON.parse(result).user_key;
      }).then(() => {
        const box = {
          token: token,
          user_key: userkey,
        };
        // console.log(box);
        fetch(func.api(3001, 'onMain'), {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(box),
        });
      });
    }
    setTimeout(() => {
      this.setState({isLoading: true});
    }, 1000);
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    await messaging().subscribeToTopic('notices');
    function onRegister(token) {
      console.log(token);
    }

    function onNotification(notify) {}
    function onOpenNotification(notify) {
      // this.setState({
      //   fisrt_name: 'Setting',
      //   fisrt_components: Bottom,
      // });
      // () => {
      // navigation.navigate('Setting');
      // };
      // alert('test');
      // console.log('[App] onOpenNotification : notify :', notify);
      // alert('Open Notification : notify.title :' + notify.title);
      // alert('Open Notification : notify.body :' + notify.body);
    }
    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  };
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isLoading ? (
            <>
              {/* <Stack.Screen
                name="ChangePW"
                component={ChangePW}
                options={{headerShown: false}}
              /> */}
              <Stack.Screen
                name={this.state.fisrt_name}
                component={this.state.fisrt_components}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name={this.state.second_name}
                component={this.state.second_components}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Signup2"
                component={Signup2}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Signup3"
                component={Signup3}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MessageCollect"
                component={MessageCollect}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Message"
                component={Message}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FriendInbox"
                component={FriendInbox}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Find_idpw"
                component={Find_idpw}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Find_idpw2"
                component={Find_idpw2}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Set_privacy"
                component={Set_privacy}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Set_alarm"
                component={Set_alarm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Set_notice"
                component={Set_notice}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="noticepush"
                component={Noticepush}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="singo"
                component={Singo}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Groupmessage"
                component={Groupmessage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="exit"
                component={Set_exit}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const Tab = createBottomTabNavigator();

function Bottom() {
  return (
    <Tab.Navigator>
      {/* 친구찾기 */}
      <Tab.Screen
        name="Man"
        component={Main}
        options={{
          unmountOnBlur: true,
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            if (focused) {
              icon = require('./Image/homeimo_full.png');
            } else {
              icon = require('./Image/homeimo.png');
            }
            return (
              <Image
                name="homeimo"
                color={color}
                source={icon}
                style={{marginTop: 15, width: size*1.1, height: size*1.1}}
              />
            );
          },
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      {/* 친구들 찾기 */}
      <Tab.Screen
        name="Group"
        component={Match_page}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            if (focused) {
              icon = require('./Image/mainimo_full.png');
            } else {
              icon = require('./Image/mainmo3.png');
            }
            return (
              <Image
                name="homeimo"
                color={color}
                source={icon}
                style={{marginTop: 15, width: size*1.6, height: size*1.1}}
              />
            );
          },
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      {/* 메세지함 */}
      <Tab.Screen
        name="MessageCollect"
        component={MessageCollect}
        options={{
          unmountOnBlur: true,
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            if (focused) {
              icon = require('./Image/msgimo_full.png');
            } else {
              icon = require('./Image/msgimo2.png');
            }
            return (
              <Image
                name="homeimo"
                color={color}
                source={icon}
                style={{marginTop: 15, width: size*1.1, height: size*1.1}}
              />
            );
          },
        }}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
      />
      {/* 알림  나중에 알람넣어요*/}
      {/* <Tab.Screen name="알림" component={Message} /> */}
      {/* 설정 */}
      <Tab.Screen
        name="Setting"
        component={Setmain}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            if (focused) {
              icon = require('./Image/setting.png');
            } else {
              icon = require('./Image/gear.png');
              //setting이미지 만드는중..
            }
            return (
              <Image
                name="homeimo"
                color={color}
                source={icon}
                style={{marginTop: 15, width: size*1.2, height: size*1.2}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
