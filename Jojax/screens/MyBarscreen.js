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
} from "react-native";
import bgImage from '../pictures/236.jpg'
import ginBottle from '../pictures/ginBottle.jpg'
class MyBarscreen extends Component {
  onPress = () => {
    this.markSelected({})
  }

  render(){
    return (


    <ImageBackground source={bgImage} style={styles.backgroundContainer}>


      <SafeAreaView style={{ flex: 1 }}>
          <View style={{flex:1}}>
            <View style={styles.headerbox}>
              <Text style={styles.headline}>
              MyBar
              </Text>
            </View>

            <FlatList style={styles.scrollContainer}>

            <View style={styles.buttonContainer}>

              <TouchableHighlight style={styles.ginButton}>
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

            </View>

          </FlatList>

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

 },

 scrollContainer:{

 },

 buttonContainer:{
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-around',
   marginBottom: 10,
 },

 ginBottle: {
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100%',
   opacity: 0.6,
 },

 ginButton: {
   width: '45%',
   height: '50%',
   borderRadius: 25,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 10,
 },

 textMyBarButton: {
   color: 'black',
   fontSize: 32,
   fontWeight: 'bold',
   textAlign: 'center',
 },

 myFavoritesButton: {
   width: '45%',
   height: '50%',
   borderRadius: 25,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 10,
 },

 textMyFavoritesButton: {
   color: 'black',
   fontSize: 32,
   fontWeight: 'bold',
   textAlign: 'center',
 },

 myNotesButton: {
   width: '45%',
   height: '50%',
   borderRadius: 25,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 10,
 },

 textMyNotesButton: {
   color: 'rgba(255,255,255,0.9)',
   fontSize: 16,
   textAlign: 'center'
 },

});
