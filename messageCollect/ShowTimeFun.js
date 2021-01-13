import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ShowTimeFun extends React.Component {
  render() {
    if (this.props.year == !this.props.item.year) {
      return (
        <View>
          <Text style={styles.timeFont}>
            {this.props.item.year}-{this.props.item.month}-{this.props.item.day}
          </Text>
        </View>
      );
    } else if (this.props.day - 1 == this.props.item.day) {
      return (
        <View>
          <Text style={styles.timeFont}>어제</Text>
        </View>
      );
    } else if (this.props.day != this.props.item.day) {
      return (
        <View>
          <Text style={styles.timeFont}>
            {this.props.item.year}-{this.props.item.month}-{this.props.item.day}{' '}
          </Text>
        </View>
      );
    } else {
      if (this.props.item.min > 9) {
        return (
          <View>
            <Text style={styles.timeFont}>
              {this.props.item.ampm} {this.props.item.hour}:
              {this.props.item.min}
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text style={styles.timeFont}>
              {this.props.item.ampm} {this.props.item.hour}:0
              {this.props.item.min}
            </Text>
          </View>
        );
      }
    }
    // return <Text>{this.props.item.year}{this.props.day}</Text>
  }
}

const styles = StyleSheet.create({
  timeFont: {
    display: 'flex',
    fontSize: 12,
    color: 'gray',
  },
});
