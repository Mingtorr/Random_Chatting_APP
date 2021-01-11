import React, {Component} from 'react';
import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import Noticepush from './noticepush';

const func = require('../../server/api');

export default class Set_notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // notice: '',
      notices: [],
    };
  }
  componentDidMount() {
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
        if (json !== undefined) {
          json.map((rows) => {
            const newdate = new Date(rows.notice_date);
            var month = newdate.getMonth() + 1;
            var day = newdate.getDate();
            var noticeday = [month, day].join('/');
            const newrow = {
              title: rows.notice_body,
              date: noticeday,
            };
            console.log(newrow);
            this.setState({
              notices: [...this.state.notices, newrow],
            });
            // console.log(this.state.notices);

            return null;
          });
        }
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
          return (
            <Noticepush
              content={content.title}
              key={index}
              date={content.date}
            />
          );
        })}
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
