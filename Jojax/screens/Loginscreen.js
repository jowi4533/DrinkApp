import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
  TextInput,
  Dimensions
} from "react-native";
import bgImage from '../pictures/236.jpg'

const {width:WIDTH} = Dimensions.get('window')

class Registerscreen extends Component {
  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style = {styles.textContainer}>
            <Text style = {styles.loginText}>
              Login or Register
            </Text>
            <View style ={styles.descText}>
            <Text>
              Login or register an account to sync and save your bar, notes and favorite recipes between devices
            </Text>
            </View>
          </View>
          <View>
          <TextInput
          style={styles.input}
          placeholder = {'Email'}
          placeholderTextColor = {'rgba(0,0,0,0.5)'}
          underlineColorAndroid = 'transparent'
          />
          </View>
      </ImageBackground>
    );
  }
}
export default Registerscreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
 backgroundContainer:{
   flex:1,
   width: null,
   height: null,
   justifyContent:'center',
   alignItems:'center'
 },
 input:{
   width: WIDTH -55,
   height: 40,
   borderRadius: 25,
   fontSize: 16,
   paddingLeft: 45,
   backgroundColor: 'white',
   color: 'rgba(0,0,0,0.9)',
   marginHorizontal: 25,
 },
 textContainer: {
   alignItems: 'center'
 },
 loginText:{
   color: 'rgba(0,0,0,0.7)',
   fontSize: 20,
   fontWeight: 'bold',
 },
 descText:{
   paddingVertical: 20,
 },
 boldText:{
   fontWeight: 'bold'
 }

});
