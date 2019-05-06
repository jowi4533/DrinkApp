import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from "react-native";
import bgImage from '../pictures/236.jpg'
import ginBottle from '../pictures/ginBottle.jpg'
class MyBarscreen extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0}
  }
  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

  render(){
    return (

    <ImageBackground source={bgImage} style={styles.backgroundContainer}>

      <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              MyBar
              </Text>
            </View>

            <View style={styles.buttonContainer}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scrollBox} >



              <TouchableHighlight style={styles.ginButton} onPress={this.onPress}>
              <ImageBackground source={require('../pictures/ginBottle.jpg')} style={styles.ginBottle} imageStyle= {{borderRadius: 25}} blurRadius={1}>
              <Text style = {styles.textMyBarButton}>Gin</Text>
              </ImageBackground>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myFavoritesButton}>
              <Text style = {styles.textMyFavoritesButton}>Whiskey</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.myNotesButton} >
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableHighlight>


            </ScrollView>
            </View>

      </SafeAreaView>

    </ImageBackground>


    );
  }
}
export default MyBarscreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  headline: {
    marginTop: 10,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 25,
 },
 headerbox: {
   height: 70,
   borderBottomWidth: 1,
   borderBottomColor: '#dddddd',

 },

 buttonContainer:{
   width: '100%',
   height: '100%',
   flex: 1,
   // backgroundColor: 'green',
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-around',
   borderColor: 'green',
   borderWidth: 8,
 },

 scrollBox: {

   // width: '100%',
   // height: '100%',
   // flex: 1,

   // backgroundColor: 'green',
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-around',

   borderBottomColor: 'red',
   borderBottomWidth: 8,

 },

 ginBottle: {
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100%',
   opacity: 0.6,
 },

 ginButton: {
   underlayColor: 'white',
   activeOpacity: 0.5,
   width: '30%',
   height: '25%',
   borderRadius: 10,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 10,
 },

 textMyBarButton: {
   color: 'black',
   fontSize: 22,
   fontWeight: 'bold',
   textAlign: 'center',
 },

 myFavoritesButton: {
   width: '30%',
   height: '25%',
   borderRadius: 10,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 10,
 },

 textMyFavoritesButton: {
   color: 'black',
   fontSize: 22,
   fontWeight: 'bold',
   textAlign: 'center',
 },

 myNotesButton: {
   width: '30%',
   height: '25%',
   borderRadius: 10,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 10,
 },

 textMyNotesButton: {
   color: 'black',
   fontSize: 22,
   fontWeight: 'bold',
   textAlign: 'center',
 },

 countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }

});
