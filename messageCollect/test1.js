import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";

import Checkbox from 'react-native-check-box';
const test1 = () => {
  const [isSelected, setSelection] = useState(false);
  const toggle = () =>{
    setSelection(!isSelected);
  }
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Do you like React Native?</Text>
      </View>
      <Checkbox
                style={{flex: 1, padding: 10}}
                onClick={toggle}
                isChecked={isSelected}
                // leftText={"CheckBox"}
              />
      <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default test1;