import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import FriendInbox from './friendInbox';
import Grouproom from './grouproom';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

export default class messageCollect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name1: '',
      pass: '',
      outButtonBool: true,
    };
  }

  toggleOut = () => {
    this.setState({
      outButtonBool: !this.state.outButtonBool,
    });
  };
  gomessage = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.messageHead}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Message</Text>
          {/* <TouchableOpacity
            onLongPress = {this.testOnClick}
            onPress = {() => this.setState({
            outButtonBool: !this.state.outButtonBool}) }>
            <Text style ={{fontSize:15, fontWeight:'bold'}}>편집</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.collectBody}>
          <MessageTab
            outButtonBool={this.state.outButtonBool}
            go={this.props.navigation}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const Tab = createMaterialTopTabNavigator();

function MessageTab(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'none',
          width: '100%',
          height: 48,
          marginTop: -8,
        },
        // tabStyle:{ width:70},
        labelStyle: {fontSize: 18, fontWeight: 'bold'},
        activeTintColor: '#eb6c63',
        inactiveTintColor: '#bababa',
        indicatorStyle: {
          borderColor: '#eb6c63',
          borderWidth: 2,
          backgroundColor: '#eb6c63',
        },
      }}>
      <Tab.Screen
        name="1:1"
        children={() => (
          <FriendInbox outButtonBool={props.outButtonBool} go={props.go} />
        )}
      />
      <Tab.Screen
        name="오픈채팅"
        // children={() => <Grouproom go={props.go} />}
        children={() => <View/>}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  messageHead: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  collectHead: {
    height: '7%',
    backgroundColor: '#a1bdff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headFont: {
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 5,
  },
  collectBody: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor: 'red',
  },
  outButton: {
    width: '20%',
    height: 40,
    backgroundColor: 'white',
    position: 'absolute',
    marginLeft: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outNavigation: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    paddingLeft: 10,
    paddingRight: 15,
    zIndex: 1,
  },
});
