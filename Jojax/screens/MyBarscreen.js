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
} from "react-native";
import bgImage from '../pictures/236.jpg'
//import ginBottle from '../pictures/ginBottle.jpg'
class MyBarscreen extends Component {
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


            <View style={styles.buttonContainer}>

               <TouchableOpacity style={styles.ginButton}>
              <ImageBackground source={ginBottle} style={styles.ginBottle} imageStyle= {{borderRadius: 25}} blurRadius={1}>
              <Text style = {styles.textMyBarButton}>Gin</Text>
              </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={styles.myFavoritesButton} onPress={() => this.props.navigation.navigate('MyFavoriteDrinks')}>
              <Text style = {styles.textMyFavoritesButton}>Whiskey</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.myNotesButton} onPress={() => this.props.navigation.navigate('MyNotes')}>
              <Text style = {styles.textMyNotesButton}>Vodka</Text>
              </TouchableOpacity>

            </View>

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
   marginTop: 25,
 },

 textMyBarButton: {
   color: 'black',
   fontSize: 32,
   fontWeight: 'bolder',
   textAlign: 'center',
 },

 myFavoritesButton: {
   width: '45%',
   height: '50%',
   borderRadius: 25,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 25,
 },

 textMyFavoritesButton: {
   color: 'black',
   fontSize: 32,
   fontWeight: 'bolder',
   textAlign: 'center',
 },

 myNotesButton: {
   width: '45%',
   height: '50%',
   borderRadius: 25,
   backgroundColor: '#07757D',
   justifyContent: 'center',
   marginTop: 25,
 },

 textMyNotesButton: {
   color: 'rgba(255,255,255,0.9)',
   fontSize: 16,
   textAlign: 'center'
 },

});
