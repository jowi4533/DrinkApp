import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from "react-native";

class Morescreen extends Component {

  render(){
    return (
          <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            <Text>
            This App has been created by the Slytherin Corp.
            xoxo
              </Text>
          </View>
    );
  }
}
export default Morescreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

});
