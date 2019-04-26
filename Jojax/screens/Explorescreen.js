import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

class Explorescreen extends Component {
  render(){
    return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{flex:1}}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              Explore
              </Text>
            </View>
            <Text style={{textAlign: 'center',marginTop:55}}>
            Jonas är bäast
            </Text>
          </View>
      </SafeAreaView>
    );
  }
}
export default Explorescreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  headline: {
      marginTop:10,
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
