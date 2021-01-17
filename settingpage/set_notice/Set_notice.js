import React, {PureComponent} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const func = require('../../server/api');

export default class Set_notice extends PureComponent {
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
        // console.log('공지'+ JSON.stringify(json));

        if (json !== undefined) {
          json.map((rows) => {
            const newdate = new Date(rows.notice_time);
            var year = newdate.getFullYear();
            year = year - 2000;
            var month = newdate.getMonth() + 1;

            if (month < 10) {
              month = '0' + month;
            }
            var day = newdate.getDate();

            if (day < 10) {
              day = '0' + day;
            }
            var noticeday = [year, month, day].join('.');
            rows.notice_date = noticeday;
            const newrow = rows;
            console.log(noticeday + '시간');
            this.setState({
              notices: [...this.state.notices, newrow],
            });
            // console.log('스테이트',this.state.notices);

            // return null;
          });
        }
      });
  }
  //<View style={{marginLeft:15,marginTop:10}}><Text style={{fontWeight:'500',fontSize:17}}>{item.notice_title}</Text></View>
  //<View style={{marginTop:5,marginBottom:10,marginLeft:15}}><Text style={{color:'gray'}}>{item.notice_date}</Text></View>

  openNotice = (key, title, body, date) => {
    // console.log('클릭함', key);
    this.props.navigation.navigate('noticepush', {
      notice_title: title,
      notice_body: body,
      notice_date: date,
    });
  };

  backBtn = () => {
    this.props.navigation.goBack(null);
  };

  renderItem = ({item}) => {
    if (item.notice_type === 0) {
      return (
        <View>
          <TouchableOpacity
            onPress={() =>
              this.openNotice(
                item.notice_key,
                item.notice_title,
                item.notice_body,
                item.notice_date,
              )
            }>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                backgroundColor: 'white',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  display: 'flex',
                  flex: 0.15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 45, height: 45}}
                  source={require('./wagle.png')}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flex: 0.85,
                  backgroundColor: 'white',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    marginLeft: 15,
                    marginTop: 10,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{fontWeight: '900', fontSize: 12, color: '#eb6c63'}}>
                    공지사항
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    marginTop: 10,
                    backgroundColor: 'white',
                  }}>
                  <Text style={{fontWeight: '500', fontSize: 14}}>
                    {item.notice_title}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 15,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{color: 'gray', fontSize: 12, fontWeight: '700'}}>
                    {item.notice_date}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={() =>
              this.openNotice(
                item.notice_key,
                item.notice_title,
                item.notice_body,
                item.notice_date,
              )
            }>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
                backgroundColor: 'black',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  display: 'flex',
                  flex: 0.15,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 45, height: 45}}
                  source={require('./wagle.png')}
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  flex: 0.85,
                  backgroundColor: 'white',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    marginLeft: 15,
                    marginTop: 10,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{fontWeight: '900', fontSize: 12, color: '#eb6c63'}}>
                    이벤트
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    marginTop: 10,
                    backgroundColor: 'white',
                  }}>
                  <Text style={{fontWeight: '500', fontSize: 14}}>
                    {item.notice_title}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 15,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{color: 'gray', fontSize: 12, fontWeight: '700'}}>
                    {item.notice_date}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{backgroundColor: 'white', display: 'flex', flex: 1}}>
        <View
          style={{
            display: 'flex',
            flex: 0.12,
            backgroundColor: 'white',
            marginTop: 10,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          }}>
          <View
            style={{
              display: 'flex',
              flex: 0.3,
              backgroundColor: 'white',
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={this.backBtn}>
              <Image
                source={require('./back2.png')}
                style={{width: 18, height: 25, marginLeft: 15}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flex: 0.88,
              backgroundColor: 'white',
              justifyContent: 'center',
              // marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 23,
                marginLeft: 26,
                color: '#000000',
                fontWeight: '800',
              }}>
              공지사항
            </Text>
          </View>
        </View>
        <View style={{display: 'flex', flex: 0.84}}>
          <FlatList
            data={this.state.notices}
            renderItem={this.renderItem}
            keyExtractor={(item) => String(item.notice_key)}
          />
        </View>
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
