import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

class More extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>More</Text>
      </View>
    );
  }
}
export default More;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
