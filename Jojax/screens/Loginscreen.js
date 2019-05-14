import React, { Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import bgImage from '../pictures/236.jpg'

const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');

class Registerscreen extends Component {
  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style = {styles.textContainer}>
            <Text style = {styles.loginText}>
              LOGIN OR REGISTER
            </Text>
            <View style ={styles.descText}>
            <Text style = {{marginHorizontal:12}}>
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
          <View style= {styles.input2}>
          <TextInput
          style={styles.input}
          placeholder = {'Password'}
          secureTextEntry= {true}
          placeholderTextColor = {'rgba(0,0,0,0.5)'}
          underlineColorAndroid = 'transparent'
          />
          </View>
          <TouchableOpacity style={styles.loginButton}>
          <Text style = {styles.textLoginButton}>SIGN IN</Text>
          </TouchableOpacity>

          <View style ={ styles.newaccountContainer}>
          <Text> Don't have an account?</Text>
          </View>
          <TouchableOpacity style = {styles.buttonRegisterHere} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style ={ styles.textRegisterHere}> Register Here! </Text>
          </TouchableOpacity>
        

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
 input2:{
   marginTop:10,
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
 },
 loginButton:{
   width: WIDTH -55,
   height: 40,
   borderRadius: 25,
   marginTop: 35,
   justifyContent: 'center',
   backgroundColor: '#07757D',
 },
 textLoginButton:{
   color: 'rgba(255,255,255,0.9)',
   fontSize: 16,
   textAlign: 'center'
 },
 newaccountContainer:{
   marginTop: 30
 },
 textRegisterHere:{
   textAlign: 'center',
   justifyContent: 'center',
   color:'rgba(249, 105, 14, 1)'
 },
 buttonRegisterHere:{
   justifyContent:'center',
   width: 100,
   height: 20,
   borderRadius: 25,
 },


});
