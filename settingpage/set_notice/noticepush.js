import React, {Component} from 'react';
import {Text, StyleSheet,SafeAreaView, View} from 'react-native';

export default class Noticepush extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    console.log('머가나올까', this.props.route.params);
  }
  //<View style={styles.Noticecon_noticepush}>
    //    <Text style={styles.Noticetext_noticepush}>{this.props.route.params.notice_title}</Text>
      //  <Text style = {styles.notice_body}>{this.props.route.params.notice_body}</Text>
     // </View>
  render() {
    return (
      <SafeAreaView style ={{backgroundColor:'white',display:'flex',flex:1}}>
        <View style={styles.Head_notice}>
          <Text style={styles.Text_notice}>공지사항</Text>
        </View>
        <View style={{display:'flex',flex:0.9,backgroundColor:'white'}}>
          <View style={{display:'flex',flex:0.1,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderBottomColor:'gray',borderBottomWidth:1}}>
            <Text style={styles.Noticetext_noticepush}>{this.props.route.params.notice_title}</Text>
          </View>
          <View style={{display:'flex',flex:0.8,backgroundColor:'white'}}>
            <Text style={{fontSize:18,marginLeft:20,marginTop:10,marginRight:20}}>{this.props.route.params.notice_body.replace(/\\n/g,'\n')}</Text>
          </View>
        </View>
        <View style={{display:'flex',flex:0.1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:14}}>궁금한 사항은 jybin96@naver.com 로 문의주시면</Text> 
          <Text style={{fontSize:14}}>빠른시일내에 답변해드리겠습니다. </Text>
        </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Head_notice: {
    marginTop: 15,
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text_notice: {
    fontFamily: 'Jalnan',
    fontSize: 25,
    color: '#eb6c63',
  },
  Noticecon_noticepush: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    borderColor: 'lightgray',
    // borderWidth: 1,
    // height: 40,
  },
  Noticetext_noticepush: {
    fontWeight:'700',
    fontSize: 19,
  },
  notice_body:{
    fontSize: 15,
    marginTop: 5,
  }
});
