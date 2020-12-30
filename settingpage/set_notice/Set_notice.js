import React, {Component} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import Noticepush from './Noticepush';

const func = require('../../server/api');

export default class Set_notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // notice: '',
      notices: [],
    };
  }
  componentWillMount() {
    const post = {};
    fetch(func.api(3003, 'notice'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((json) => {
        json.map((rows) => {
          this.setState({
            notices: [...this.state.notices, rows],
          });
          // console.log(this.state.notices);

          return null;
        });
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.Container_notice}>
        <View style={styles.Head_notice}>
          <Text style={styles.Text_notice}>공지사항</Text>
        </View>
        {/* <Noticepush /> */}
        {this.state.notices.map((content, index) => {
          console.log(content.notice_body);
          // console.log(this.state.notices);
          return <Noticepush content={content.notice_body} key={index} />;
        })}
        <Noticepush content="실험용" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container_notice: {
    display: 'flex',
    flex: 1,
  },
  Head_notice: {
    marginTop: 15,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text_notice: {
    fontFamily: 'Jalnan',
    fontSize: 25,
    color: '#eb6c63',
  },
  Noticetext_notice: {
    fontFamily: 'Jalnan',
    fontSize: 18,
    marginLeft: 15,
  },
  Noticecon_notice: {
    display: 'flex',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    height: 40,
  },
});
