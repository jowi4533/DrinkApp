import React, { Component} from "react";
import { Ionicons,FontAwesome,Entypo } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView

} from "react-native";

class Drinkscreen extends Component {
  render(){
    return (
      <SafeAreaView style={styles.container}>
          <View style ={styles.headerBox}>
          <Text style = {styles.textHeader}> Drinks </Text>
          </View>

          <View style = {styles.searchBox}>
            <View>
          </View>
          </View>

      </SafeAreaView>
    );
  }
}
export default Drinkscreen;

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  textHeader: {
    marginTop: 2.5,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,

 },
 headerBox:{
   backgroundColor: 'white',
   height: 45,
   borderBottomWidth: 1,
   borderBottomColor: '#dddddd'
 },
 searchBox:{
   height:70,
   borderBottomWidth:1
 },
 innerSearchBox:{
   height: 40,
   flexDirection:'row',
   backgroundColor: 'white'

 }
});
