import React, { Component} from "react";
import { Ionicons,FontAwesome,Entypo,EvilIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,

} from "react-native";
const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');

class Drinkscreen extends Component {
  render(){
    return (
      <SafeAreaView style={styles.container}>
      <View style ={styles.headerBox}>
      <Text style = {styles.textHeader}> Drinks </Text>
      </View>
      <View style = {styles.searchBox}>
      <View style = {styles.innerSearchBox}>
      <EvilIcons name= 'search' size={30}>
      </EvilIcons>
      <TextInput placeholder = 'Search' style={styles.searchInput}>
      </TextInput>
      <TouchableOpacity style={styles.buttonFilter}>
      <Text style = {styles.textFilterButton}>Filter</Text>
      </TouchableOpacity>
      </View>
      </View>
      <ScrollView scrollEventThrottle = {16}>
      <View style = {styles.drinkContainer}>
      <TouchableOpacity style = {styles.buttonDrink}>

      </TouchableOpacity>
      </View>
      </ScrollView>


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
    borderBottomWidth:1,
    borderBottomColor:'#dddddd',
    backgroundColor: 'rgba(236, 236, 236, 1)',
    justifyContent: 'center'
  },
  innerSearchBox:{
    height:40,
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft:10,
    paddingLeft: 5,
    flexDirection: 'row',
    marginRight: WIDTH/5
  },
  searchInput:{
    backgroundColor:'white',
    width: WIDTH-(WIDTH/2.9),
    fontSize:24,
    marginLeft:10,
  },
  buttonFilter:{
    marginLeft: 20,
    backgroundColor: 'white',
    height:40,
    justifyContent: 'center',
    padding:10,
    borderRadius: 5,

  },
  textFilterButton:{
    color: 'rgba(0,0,0,0.9)',
    fontSize: 14,
    textAlign: 'center'
  },
  drinkContainer:{
    height:130,
    Width: WIDTH,
    borderBottomWidth:1,
    borderBottomColor:'#dddddd',
  },
  buttonDrink:{
    backgroundColor:'red',
    flex:1
  }


});
