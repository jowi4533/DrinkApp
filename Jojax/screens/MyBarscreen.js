import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from "react-native";

class MyBarscreen extends Component {
  render(){
    return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{flex:1}}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              MyBar
              </Text>
            </View>
            <Text style={{textAlign: 'center',marginTop:55}}>
            MyBar
            </Text>
          </View>
      </SafeAreaView>
    );
  }
}
export default MyBarscreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  headline: {
    marginTop: 10,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,
 },
 headerbox:{
   backgroundColor: 'white',
   height: 70,
   borderBottomWidth: 1,
   borderBottomColor: '#dddddd'

 }
});
