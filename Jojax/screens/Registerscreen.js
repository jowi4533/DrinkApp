import React, { Component} from "react";
import {Ionicons} from '@expo/vector-icons';
import {Alert} from 'react-native'
import App from '../App'
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
import bgImage from "../pictures/236.jpg";
import {colors} from "../assets/colors.js";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");


class Registerscreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      repeatPassword: 'Repeat Password',

      usersDB: props.screenProps.usersDB,
      userAuth : props.screenProps.userAuth,
      loggedIn: false,

    }
  }

  static navigationOptions = {
    title: 'Register',
    headerTitleStyle: {
      width: '100%',
      fontWeight: 'bold',
      fontSize: 25,
      color:colors.black
    },
  };

  readValues(){
    if(this.state.password === this.state.repeatPassword){
      if(this.checkIfUserExist() === false){
        this.createNewUser();
      }
    }
    else{
      Alert.alert("Passwords do not coincide")
    }
  }

  initiateListener(){
    this.state.userAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;

      } else {
        console.log("user is logged out")
      }
    });
  }

  createNewUser(){
    let data = {
      email: this.state.email,
      password: this.state.password,
    }

    const promise = this.state.userAuth.createUserWithEmailAndPassword(data.email, data.password)
    promise.catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Wrong Password', errorMessage);
      } else {
        Alert.alert(errorCode, errorMessage)
      } console.log(error);
    });

    data.email = this.state.email.toLowerCase()
    this.state.usersDB.push(data.email)

    this.props.navigation.navigate("AllDrinks")
    this.setState({loggedIn: true})
  }

  checkIfUserExist(){
    return false;
  }

  logOutUser(){
    this.state.userAuth.signOut()
    this.setState({loggedIn: false})
  }

  render(){
    if(this.state.loggedIn=== false){
      return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.marginView}>
          </View>
          <View style={styles.mainContent}>
          <View style= {styles.registerTextContainer}>
            <Text style = {styles.registerText}>
              REGISTER
            </Text>
            <View style ={styles.descTextContainer}>
              <Text style = {styles.descText}>
              Register an account to be able to sync and save your bar, notes and favorite drinks between devices
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

        <View style= {styles.textInputContainer}>
          <View style={styles.inputIconContainer}>
            <Ionicons name='md-lock' size={24}></Ionicons>
          </View>
          <TextInput
            style={styles.input}
            placeholder = {"Password"}
            secureTextEntry= {true}
            placeholderTextColor = 'darkgray'
            underlineColorAndroid = 'transparent'
            onChangeText = {password => this.setState({password})}
          />
        </View>

        <View style= {styles.textInputContainer}>
          <View style={styles.inputIconContainer}>
            <Ionicons name='md-lock' size={24}></Ionicons>
          </View>
          <TextInput
            style={styles.input}
            placeholder = {"Repeat Password"}
            secureTextEntry= {true}
            placeholderTextColor = 'darkgray'
            underlineColorAndroid = 'transparent'
            onChangeText = {repeatPassword => this.setState({repeatPassword})}
          />
        </View>

        <View style ={styles.termsTextContainer}>
          <Text style ={styles.termsText}>
            By registering you agree to the terms & conditions
          </Text>
        </View>

        <View style={styles.registerButtonContainer}>
          <TouchableOpacity
            onPress={this.readValues.bind(this)}
            style={styles.registerButton}>
            <Text style = {styles.registerButtonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>

        </View>

        <View style={styles.marginViewBottom}>
        </View>
      </ImageBackground>
      );
    } else{
      return(
        <View>
        <Text> Ur logged in! </Text>

        <TouchableOpacity
        style={styles.loginButton}
        onPress= {this.logOutUser.bind(this)}>
        <Text style = {styles.textLoginButton}>SIGN OUT</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }



}
export default Registerscreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    //justifyContent: "center",
    alignItems: "center"
  },

  marginView: {
    //borderWidth: 2,
    //borderColor: 'pink',
    flex: 20,
  },

  mainContent: {
    flex: 60
  },

  registerTextContainer: {
    //borderWidth: 2,
    //borderColor: colors.midblue,
    alignItems: 'center',
  },
  registerText: {
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    width: WIDTH,
    color: colors.black,
    fontSize: 20,
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

  input: {
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

  termsTextContainer: {
    marginTop: 10,
  },
  termsText: {
    marginHorizontal: 10,
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: colors.darkgray,
    justifyContent: 'center',
    textAlign: "center",
  },

  registerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
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

});
