// LOGO version
import React, {Component} from 'react';
import {View,Image, Text, Animated, SafeAreaView, StyleSheet} from 'react-native';

export default class Splash extends Component {
  state = {
    animation: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const animationStyles = {
      opacity: this.state.animation,
    };
    return (
      <SafeAreaView style={styles.splash_con}>
        <Animated.View style={[styles.splash_top, animationStyles]}>
          {/* <Text style={styles.handfont_splash}>내손안에 우리학교</Text> */}
        </Animated.View>
        <Animated.View style={[styles.splash_mid, animationStyles]}>
                  <Image
                      style={{height:'100%',width:'100%',resizeMode:'contain'}}
                      source={require('./splashmain.png')}
                    />        
        </Animated.View>
        <View style={styles.splash_end}>
          <Text>copyright by wesix</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  splash_con: {
    display: 'flex',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  splash_top: {
    flex: 0.45,
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
  },
  splash_mid: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 300,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash_end: {
    // alignSelf: 'stretch',
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // marginTop: 20,
    flex: 0.45,
  },
  handfont_splash: {
    fontFamily: 'Jalnan',
  },
  drfont_splash: {
    fontFamily: 'Jalnan',
    fontSize: 60,
    fontWeight: '900',
    color: 'white',
  },
});

//ㅇㄱㅇㄱ 버전
// import React, {Component} from 'react';
// import {
//   View,
//   Image,
//   Text,
//   Animated,
//   SafeAreaView,
//   StyleSheet,
// } from 'react-native';

// export default class Splash extends Component {
//   state = {
//     animation: new Animated.Value(0),
//   };
//   componentDidMount() {
//     Animated.timing(this.state.animation, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//   }

//   render() {
//     const animationStyles = {
//       opacity: this.state.animation,
//     };
//     return (
//       <SafeAreaView style={styles.splash_con}>
//         <Animated.View style={[styles.splash_top, animationStyles]}>
//           <Text style={styles.handfont_splash}>내 손 안에 우리학교</Text>
//         </Animated.View>
//         <Animated.View style={[styles.splash_mid, animationStyles]}>
//           <Text style={styles.drfont_splash}>ㅇㄱㅇㄱ</Text>
//         </Animated.View>
//         <View style={styles.splash_end}>
//           <Text>copyright by wesix</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   splash_con: {
//     display: 'flex',
//     flex: 1,
//     // justifyContent: 'center',
//     alignItems: 'center',
//   },
//   splash_top: {
//     flex: 0.45,
//     justifyContent: 'flex-end',
//     // backgroundColor: 'blue',
//   },
//   splash_mid: {
//     // backgroundColor: 'pink',
//     borderRadius: 30,
//     width: 300,
//     height: 300,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   splash_end: {
//     // alignSelf: 'stretch',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//     flex: 0.45,
//   },
//   handfont_splash: {
//     fontFamily: 'Jalnan',
//   },
//   drfont_splash: {
//     fontFamily: 'Jalnan',
//     fontSize: 150,
//     fontWeight: '900',
//     color: 'pink',
//   },
// });
