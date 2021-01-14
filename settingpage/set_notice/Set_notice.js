import React, {Component} from 'react';
import {Text, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import Noticepush from './noticepush';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const func = require('../../server/api');

export default class Set_notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // notice: '',
      notices: [],
      ids: [],
    };
  }
  componentDidMount() {
    console.log('12asa');
    const post2 = {
      sex: 'sex',
    };
    
    fetch(func.api(3009, 'Getnotice'), {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post2),
    })
    .then((res) => res.json())
    .then((json) => {
        console.log('공지11');
        console.log('공지'+ JSON.stringify(json));

        if (json !== undefined) {
          console.log('이프문')
          json.map((rows) => {
            const newdate = new Date(rows.notice_date);
            var month = newdate.getMonth() + 1;
            var day = newdate.getDate();
            var noticeday = [month, day].join('/');
            rows.notice_date = noticeday;
            const newrow = rows;
            console.log(newrow);
            this.setState({
              notices: [...this.state.notices, newrow],
            });
            console.log('스테이트',this.state.notices);

            // return null;
          });
        }
      });
  }
  
  openNotice = (key, title, body, date) =>{
    console.log('클릭함', key);
    this.props.navigation.navigate('noticepush',{
      notice_title: title,
      notice_body: body,
      notice_date: date,
    })
  }

  renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress ={() =>this.openNotice(item.notice_key, item.notice_title, item.notice_body, item.notice_date)}>
          <View style={{borderBottomWidth: 1,borderBottomColor: 'lightgray',backgroundColor:'white'}}>
          <View><Text style={{fontWeight:'bold',fontSize:17}}>{item.notice_title}</Text></View>
          <View>
            <Text>{item.notice_body.length >35
            ? item.notice_body.substr(0, 37).padEnd(40, '.')
            : item.notice_body}</Text></View>
          <View><Text>{item.notice_date}</Text></View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style ={styles.container}>
        <View style={styles.Head_notice}>
          <Text style={styles.Text_notice}>공지사항</Text>
        </View>
        <FlatList
          data={this.state.notices}
          renderItem={this.renderItem}
          keyExtractor={(item) => String(item.notice_key)}
        />
      </SafeAreaView>
      // <SafeAreaView style={styles.Container_notice}>
      //   <View style={styles.Head_notice}>
      //     <Text style={styles.Text_notice}>공지사항</Text>
      //   </View>
      //   {/* <Noticepush /> */}
      //   {this.state.notices.map((content, index) => {
      //     console.log(content.notice_body);
      //     // console.log(this.state.notices);
      //     return (
      //       <Noticepush
      //         content={content.title}
      //         key={index}
      //         date={content.date}
      //       />
      //     );
      //   })}
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container_notice: {
    display: 'flex',
    backgroundColor:'white',
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
    // borderColor: 'lightgray',
    borderWidth: 1,
    height: 40,
  },
});
