import React, { Component} from "react";
import {Ionicons} from '@expo/vector-icons';
import {
  Alert,
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
      this.setState({loggedIn : false})
      return(false)
    } else{
      this.setState({loggedIn : true})
      this.setState({userEmail : this.state.userAuth.currentUser.email})
      return(true)
    }
  }

  logOutUser(){
    this.state.userAuth.signOut()
    this.setState({loggedIn: false})
  }

  loginUser(){
    const promise = this.state.userAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
    promise.catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Wrong Password', errorMessage);
      } else {
        Alert.alert(errorCode, errorMessage)
      } console.log(error);
    });
  }

  alertUser = (alert) => {
    const alert2 = 'The password you entered is not valid, please try again.'
    Alert.alert('Invalid Password', alert2);
    return {
        type: 'ALERT_USER',
        alert2
    }
  };

  initiateListener(){
    this.state.userAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("In listener, user online (LOGINSCREEN)")
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        this.setState({loggedIn : true})
        this.props.navigation.navigate("MyPage")

      } else {
        console.log("In listener, user offline (LOGINSCREEN)")
      }
    });
  }


  render(){
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.marginViewTop}>
        </View>
        <View style={styles.mainContent}>
          <View style = {styles.loginTextContainer}>
            <Text style = {styles.loginText}>
              LOG IN
            </Text>
            <View style ={styles.descTextContainer}>
              <Text style = {styles.descText}>
              Log in to be able to sync and save your bar, notes and favorite drinks between devices
              </Text>
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='md-person' size={24}></Ionicons>
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize = 'none'
              placeholder = {'Email'}
              placeholderTextColor = 'darkgray'
              underlineColorAndroid = 'transparent'
              onChangeText = {email => this.setState({email})}
            />
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='md-lock' size={24}></Ionicons>
            </View>
            <TextInput
              style={styles.input}
              placeholder = {'Password'}
              secureTextEntry= {true}
              placeholderTextColor = 'darkgray'
              underlineColorAndroid = 'transparent'
              onChangeText = {password => this.setState({password})}
            />
          </View>

          <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress= {this.loginUser.bind(this)}>
            <Text style = {styles.textLoginButton}>SIGN IN</Text>
          </TouchableOpacity>
          </View>

          <View style ={styles.noAccountTextContainer}>
            <Text style={styles.noAccountText}>Don't have an account?</Text>
          </View>
          <View style={styles.registerButtonContainer}>
            <TouchableOpacity style={styles.registerButton} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.registerButtonText}>GO TO REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.marginViewBottom}>
        </View>

      </ImageBackground>
    );
  }
}
export default Registerscreen;

const styles = StyleSheet.create({
 backgroundContainer:{
   flex:1,
   width: null,
   height: null,
   //justifyContent:'center',
   alignItems:'center'
 },

 marginViewTop: {
   //borderWidth: 2,
   //borderColor: 'pink',
   flex: 20,
 },

 mainContent: {
   flex: 60
 },

 loginTextContainer: {
    alignItems: 'center'
 },

 loginText:{
   fontFamily: 'Quicksand-Bold',
   textAlign: 'center',
   width: WIDTH,
   color: colors.black,
   fontSize: 20,
   //fontWeight: 'bold',
 },

 descTextContainer: {
   width: WIDTH/1.15,
   justifyContent: 'center',
   alignItems: 'center',
 },

 descText:{
   fontSize: 14,
   //textAlign: 'center',
   color: colors.darkgray,
   fontFamily: 'Quicksand-Regular',
   paddingVertical: 20,
 },

 textInputContainer: {
   elevation: 5,
   flexDirection: 'row',
   width: WIDTH/1.12,
   height: 40,
   borderRadius: 25,
   backgroundColor: colors.white,
   marginHorizontal: 25,
   marginBottom: 10,
 },
 inputIconContainer: {
   justifyContent: 'center',
   alignItems: 'center',
   //backgroundColor: colors.lightred,
   width: WIDTH/9,
   borderRadius: 25,
   marginRight: 5,
 },
 input:{
   width: WIDTH/1.5,
   height: 40,
   //borderRadius: 25,
   fontSize: 16,
   //paddingLeft: 45,
   //backgroundColor: colors.midblue,
   color: colors.black,
   //marginHorizontal: 25,
   //marginTop: 25,
   fontFamily: 'Quicksand-Regular',
 },

 loginButtonContainer: {
   alignItems: 'center',
   justifyContent: 'center',
 },

 loginButton:{
   elevation: 5,
   width: WIDTH/1.12,
   height: 40,
   borderRadius: 25,
   //marginTop: 25,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: colors.darkgreen,
 },
 textLoginButton:{
   fontFamily: 'Quicksand-Medium',
   color: colors.white,
   fontSize: 16,
   textAlign: 'center'
 },
 noAccountTextContainer:{
   marginTop: 60
 },
 noAccountText:{
   fontFamily: 'Quicksand-Medium',
   fontSize: 16,
   color: colors.darkgray,
   textAlign: 'center',
   justifyContent: 'center',
 },

 registerButtonContainer: {
   alignItems: 'center',
   justifyContent: 'center',
 },

 registerButton:{
   elevation: 5,
   backgroundColor: colors.orange,
   justifyContent:'center',
   marginTop: 10,
   //alignSelf: 'flex-end',
   width: WIDTH/1.12,
   height: 40,
   borderRadius: 25,
 },
 registerButtonText: {
   fontFamily: 'Quicksand-Medium',
   color: colors.white,
   fontSize: 16,
   textAlign: 'center'
 },

 // marginViewBottom: {
 //   flex: 20,
 // },

});
