import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class Noticepush extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    console.log('머가나올까', this.props.route.params);
  }
  render() {
    return (
      <View style={styles.Noticecon_noticepush}>
        <Text style={styles.Noticetext_noticepush}>{this.props.route.params.notice_title}</Text>
        <Text style = {styles.notice_body}>{this.props.route.params.notice_body}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Noticecon_noticepush: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    borderColor: 'lightgray',
    // borderWidth: 1,
    // height: 40,
  },
  Noticetext_noticepush: {
    fontFamily: 'Jalnan',
    fontSize: 18,
    marginLeft: 15,
  },
  notice_body:{
    fontSize: 15,
    marginTop: 5,
  }
});
