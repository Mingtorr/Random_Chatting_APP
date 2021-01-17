import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {NavigationActions} from 'react-navigation';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    } else {
    }
  };

  checkPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          //User has permission
          this.getToken(onRegister);
        } else {
          //User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch((error) => {
        console.log('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('[FCMService] Request Permission rejected', error);
      });
  };

  deleteToken = () => {
    console.log('[FCMService] deleteToken');
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('[FCMService] Delete token error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    //When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      //?notification 빼야하나 ?
      ({navigation}) => {
        navigation.navigate('MessageCollect');
      };
      //console.log(
      // '[FCMService] onNotificationOpenApp Notification caused app to open from background',
      // remoteMessage,
      //);
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
        // console.log(notification);
        // alert(remoteMessage);
        //this.removeDeliveredNotification(Notification.NotificationId)
      } else {
        console.log('background notification error', error);
      }
      // alert(remoteMessage.body);
    });

    //Check whether an initial notification is available
    //When the application is opend from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification casued app to open from quit state : fcmremoteMessage :',
          remoteMessage,
        );

        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
          //this.removeDeliveredNotification(notification.notificationId)
        } else {
          /*console.log('quit state notification error : ', error);*/
        }
      });

    //Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCM message arrived', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.notification;
          //.data.없앰
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    //Triggerd when have new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('[FCMService] New token refresh :', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
