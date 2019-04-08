import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

class Drinks extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text> Drinks </Text>
      </View>
    );
  }
}
export default Drinks;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
