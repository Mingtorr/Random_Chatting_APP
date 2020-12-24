import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './login/login';
import Signup from './sign_up/sign_up';
import Signup2 from './sign_up/sign_up2';
import Signup3 from './sign_up/sign_up3';
import Main from './main/Main';
import Match_page from './matchpage/match_page';
import Groupmatch from './groupmatch/groupmatch';
import Message from './message/message';
import Find_idpw from './Find_idpw/Find_idpw';
import Find_idpw2 from './Find_idpw/Find_idpw2';
import Splash from './splash/Splash';
import Setmain from './settingpage/set_main/Set_main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MessageCollect from './messageCollect/messageCollect';
import Set_privacy from './settingpage/set_privacy/Set_privacy';
import Set_alarm from './settingpage/set_alarm/Set_alarm';
import {fcmService} from './push/FCMService';
import {localNotificationService} from './push/LocalNotificationService';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import FriendInbox from './messageCollect/friendInbox';

// const Anisplash = Splash.animate({opacity: "1"}, 500)
const Stack = createStackNavigator();
export default class App extends React.Component {
  state = {
    isLoading: false, //false면 스플래시
    isLogin: false, // 로그인하면 true로 변경
    fisrt_name: 'Login',
    fisrt_components: Login,
    second_name: 'Main',
    second_components: Bottom,
  };

  componentWillMount() {
    AsyncStorage.getItem('login_onoff_set', (err, result) => {
      if (result === 'true') {
        this.setState({
          fisrt_name: 'Main',
          fisrt_components: Bottom,
          second_name: 'Login',
          second_components: Login,
        });
      }
    });
  }

  componentDidMount = async () => {
    setTimeout(() => {
      this.setState({isLoading: true});
    }, 1000);

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister : token :', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification : notify :', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification : notify :', notify);
      alert('Open Notification : notify.body :' + notify.body);
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
      <Tab.Screen name="Man" component={Main} />
      {/* 친구들 찾기 */}
      <Tab.Screen name="Group" component={Match_page} />
      {/* 메세지함 */}
      <Tab.Screen name="MessageCollect" component={MessageCollect} />
      {/* 알림  나중에 알람넣어요*/}
      {/* <Tab.Screen name="알림" component={Message} /> */}
      {/* 설정 */}
      <Tab.Screen name="Setting" component={Setmain} />
    </Tab.Navigator>
  );
}
