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
import {colors} from "../assets/colors.js";

const { width:WIDTH, height:HEIGHT } = Dimensions.get('window');


class Registerscreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "Email",
      password: "Password",

      userAuth : props.screenProps.userAuth,
      loggedIn : false,

      userEmail: null,

    }
    this.checkUserLoggedIn()
    this.initiateListener()
  }

  static navigationOptions = {
    title: 'Login',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25
    },
  };

  checkUserLoggedIn(){
    if(this.state.userAuth.currentUser === null){
      this.state.loggedIn = false
    } else{
      this.state.loggedIn = true
      this.state.userEmail = this.state.userAuth.currentUser.email
    }
  }

  logOutUser(){
    this.state.userAuth.signOut()
    this.setState({loggedIn: false})
  }

  loginUser(){

    const promise = this.state.userAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
    promise.catch(e => console.log(e.message))
    this.checkUserLoggedIn()
    this.setState({loggedIn : true})
  }

  initiateListener(){
    this.state.userAuth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("In listener, user online (LOGINSCREEN)")
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;

      } else {
        console.log("In listener, user offline (LOGINSCREEN)")
      }
    });
  }


  render(){

    if(this.state.loggedIn === false)
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style = {styles.textContainer}>
            <Text style = {styles.loginText}>
              LOGIN
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
          placeholderTextColor = 'darkgray'
          underlineColorAndroid = 'transparent'
          onChangeText = {email => this.setState({email})}
          />
          </View>
          <View style= {styles.input2}>
          <TextInput
          style={styles.input}
          placeholder = {'Password'}
          secureTextEntry= {true}
          placeholderTextColor = 'darkgray'
          underlineColorAndroid = 'transparent'
          onChangeText = {password => this.setState({password})}
          />
          </View>
          <TouchableOpacity
          style={styles.loginButton}
          onPress= {this.loginUser.bind(this)}>
          <Text style = {styles.textLoginButton}>SIGN IN</Text>
          </TouchableOpacity>

          <View style ={ styles.newaccountContainer}>
          <Text style={styles.textRegisterHere}>Don't have an account?</Text>
          </View>
          <TouchableOpacity style={styles.buttonRegisterHere} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.buttonRegisterHereText}>REGISTER HERE</Text>
          </TouchableOpacity>


      </ImageBackground>
    );
    else{
      return(
        <View>
        <Text> Ur logged in! {this.state.userEmail} </Text>

        <TouchableOpacity
        style={styles.loginButton}
        onPress= {this.logOutUser.bind(this)}>
        <Text style = {styles.textLoginButton}>SIGN OUT</Text>
        </TouchableOpacity>
        </View>
      )
    }
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
   backgroundColor: colors.white,
   color: colors.black,
   marginHorizontal: 25,
 },
 input2:{
   marginTop:10,
 },
 textContainer: {
   alignItems: 'center'
 },
 loginText:{
   textAlign: 'center',
   width: WIDTH,
   color: colors.darkgray,
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
   elevation: 10,
   width: WIDTH -55,
   height: 40,
   borderRadius: 25,
   marginTop: 35,
   justifyContent: 'center',
   backgroundColor: colors.darkgreen,
 },
 textLoginButton:{
   color: colors.white,
   fontSize: 16,
   textAlign: 'center'
 },
 newaccountContainer:{
   marginTop: 30
 },
 textRegisterHere:{
   fontSize: 16,
   textAlign: 'center',
   justifyContent: 'center',
   color: colors.darkgray,
 },
 buttonRegisterHere:{
   elevation: 10,
   backgroundColor: colors.orange,
   justifyContent:'center',
   marginTop: 30,
   //alignSelf: 'flex-end',
   width: WIDTH -55,
   height: 40,
   borderRadius: 25,
 },
 buttonRegisterHereText: {
   color: colors.white,
   fontSize: 16,
   textAlign: 'center'
 },

});
