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
          <View style={{flex:1}}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              More
              </Text>
            </View>
            <Text style={{textAlign: 'center',marginTop:55}}>
            test
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
  headline: {
    marginTop: 10,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,

 },
 headerbox:{
   marginTop:25,
   backgroundColor: 'white',
   height: 70,
   borderBottomWidth: 1,
   borderBottomColor: '#dddddd'

 }
});
